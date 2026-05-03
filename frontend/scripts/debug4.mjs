import { readFileSync } from 'fs'

// Reproduce the full convertTemplate with error tracing
function tokenize(src) {
  const tokens = []
  let i = 0
  while (i < src.length) {
    const s = src.indexOf('{{', i)
    if (s === -1) { if (i < src.length) tokens.push({ type: 'text', value: src.slice(i) }); break }
    if (s > i) tokens.push({ type: 'text', value: src.slice(i, s) })
    const e = src.indexOf('}}', s + 2)
    if (e === -1) { tokens.push({ type: 'text', value: src.slice(s) }); break }
    tokens.push({ type: 'action', value: src.slice(s + 2, e).trim() })
    i = e + 2
  }
  return tokens
}

function lcFirst(str) { return str ? str.charAt(0).toLowerCase() + str.slice(1) : str }
function convertField(expr, inRange) {
  expr = expr.trim()
  if (expr.startsWith('$.')) { const p = expr.slice(2).split('.'); return 'props.' + p.map(lcFirst).join('?.') }
  if (expr.startsWith('.')) {
    const rest = expr.slice(1)
    if (rest === '') return inRange ? 'item' : 'props'
    const parts = rest.split('.')
    return (inRange ? 'item' : 'props') + '.' + parts.map(lcFirst).join('?.')
  }
  return expr
}

function parseArgs(str) {
  const args = [], cnt = {d:0}; let cur = ''
  for (const ch of str) {
    if (ch === '(') { cnt.d++; cur += ch }
    else if (ch === ')') { cnt.d--; cur += ch }
    else if (ch === ' ' && cnt.d === 0) { if (cur) { args.push(cur); cur = '' } }
    else cur += ch
  }
  if (cur) args.push(cur)
  return args
}

function convertVal(v, inRange) {
  v = v.trim()
  if (v.startsWith('"') || v.startsWith("'")) return v
  if (/^\d/.test(v)) return v
  if (v === 'true' || v === 'false') return v
  if (v === 'nil' || v === 'null') return 'null'
  if (/^\.[A-Za-z_]/.test(v) || /^\$\./.test(v)) return convertField(v, inRange)
  if (v.startsWith('(')) return convertCond(v, inRange)
  return `"${v}"`
}

function convertCond(cond, inRange, depth=0) {
  if (depth > 30) return `/* TOO DEEP: ${cond.slice(0,50)} */`
  cond = cond.trim()
  for (const [op, jsOp] of [['eq','==='],['ne','!=='],['gt','>'],['lt','<'],['ge','>='],['le','<=']]) {
    const m = cond.match(new RegExp(`^${op}\\s+(\\S+)\\s+(.+)$`))
    if (m) return `${convertVal(m[1], inRange)} ${jsOp} ${convertVal(m[2].trim(), inRange)}`
  }
  if (cond.startsWith('not ')) return `!(${convertCond(cond.slice(4).trim(), inRange, depth+1)})`
  if (cond.startsWith('or '))  return '(' + parseArgs(cond.slice(3)).map(p => convertCond(p, inRange, depth+1)).join(' || ') + ')'
  if (cond.startsWith('and ')) return '(' + parseArgs(cond.slice(4)).map(p => convertCond(p, inRange, depth+1)).join(' && ') + ')'
  if (cond.startsWith('(')) {
    let d = 0, end = -1
    for (let i = 0; i < cond.length; i++) {
      if (cond[i] === '(') d++
      else if (cond[i] === ')') { d--; if (d === 0) { end = i; break } }
    }
    if (end === cond.length - 1) return convertCond(cond.slice(1, -1), inRange, depth+1)
  }
  return convertVal(cond, inRange)
}

function attrValToExpr(val) {
  const toks = tokenize(val)
  if (toks.length === 1 && toks[0].type === 'action') {
    const e = simpleActionExpr(toks[0].value)
    return `String(${e} ?? "")`
  }
  const stack = []; let result = '`'
  for (const tok of toks) {
    if (tok.type === 'text') {
      result += tok.value.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$(?=\{)/g,'\\$')
    } else {
      const a = tok.value
      if (a === 'AppSubUrl' || a === '.CsrfToken' || a === '$.CsrfToken') {}
      else if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) result += `\${String(${convertField(a, false)} ?? "")}`
      else if (/^ctx\.Locale\.Tr\s+"/.test(a)) { const k = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)[1]; result += `\${i18n("${k}")}` }
      else if (/^if\s/.test(a)) { const cond = convertCond(a.slice(3).trim(), false); stack.push({type:'if',phase:'then'}); result += `\${(${cond}) ? \`` }
      else if (a === 'else') { const top = stack[stack.length-1]; if (top?.type==='if') { top.phase='else'; result += '` : `' } }
      else if (a === 'end') { const top = stack.pop(); if (top?.type==='if') result += top.phase==='else' ? '`}' : '` : ""}' }
    }
  }
  return result + '`'
}

function simpleActionExpr(a) {
  if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) return convertField(a, false)
  return '""'
}

// Test all attr values from members.tmpl
const src = readFileSync('/tmp/gitea/templates/org/team/members.tmpl', 'utf8')
const dynAttrs = []
let i = 0
while (i < src.length) {
  const eq = src.indexOf('="', i)
  if (eq === -1) break
  let ns = eq - 1
  while (ns >= i && /[\w-]/.test(src[ns])) ns--
  ns++
  const attrName = src.slice(ns, eq)
  if (!attrName || !/^[a-zA-Z]/.test(attrName)) { i = eq + 2; continue }
  let je = eq + 2, found = -1
  while (je < src.length) { if (src[je] === '"') { found = je; break }; je++ }
  if (found === -1) { i = eq + 2; continue }
  const attrVal = src.slice(eq + 2, found)
  if (attrVal.includes('{{')) {
    try {
      const result = attrValToExpr(attrVal)
      console.log(`OK: ${attrName}="${attrVal.slice(0,60)}" → ${result.slice(0,60)}`)
    } catch(e) {
      console.log(`ERR: ${attrName}="${attrVal.slice(0,60)}" → ${e.message}`)
    }
  }
  i = found + 1
}
console.log('done')
