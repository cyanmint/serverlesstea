// Test preProcessDynamicAttrs → attrValToExpr → tokenize chain
// to find the infinite recursion

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
  if (expr.startsWith('$.')) { return 'props.' + expr.slice(2).split('.').map(lcFirst).join('?.') }
  if (expr.startsWith('.')) {
    const rest = expr.slice(1)
    if (!rest) return inRange ? 'item' : 'props'
    return (inRange ? 'item' : 'props') + '.' + rest.split('.').map(lcFirst).join('?.')
  }
  return expr
}
function parseArgs(str) {
  const args = []; let cur = '', d = 0
  for (const ch of str) {
    if (ch === '(') { d++; cur += ch } else if (ch === ')') { d--; cur += ch }
    else if (ch === ' ' && d === 0) { if (cur) { args.push(cur); cur = '' } } else cur += ch
  }
  if (cur) args.push(cur); return args
}
function convertCond(cond, inRange, depth=0) {
  if (depth > 30) return 'true'
  cond = cond.trim()
  for (const [op, jsOp] of [['eq','==='],['ne','!=='],['gt','>'],['lt','<'],['ge','>='],['le','<=']]) {
    const m = cond.match(new RegExp(`^${op}\\s+(\\S+)\\s+(.+)$`))
    if (m) return `${convertVal(m[1], inRange, depth+1)} ${jsOp} ${convertVal(m[2].trim(), inRange, depth+1)}`
  }
  if (cond.startsWith('not ')) return `!(${convertCond(cond.slice(4).trim(), inRange, depth+1)})`
  if (cond.startsWith('or '))  return '(' + parseArgs(cond.slice(3)).map(p => convertCond(p, inRange, depth+1)).join(' || ') + ')'
  if (cond.startsWith('and ')) return '(' + parseArgs(cond.slice(4)).map(p => convertCond(p, inRange, depth+1)).join(' && ') + ')'
  if (cond.startsWith('(')) {
    let d = 0, end = -1
    for (let i = 0; i < cond.length; i++) {
      if (cond[i] === '(') d++ ; else if (cond[i] === ')') { d--; if (d === 0) { end = i; break } }
    }
    if (end === cond.length - 1 && end > 0) return convertCond(cond.slice(1, -1), inRange, depth+1)
  }
  return convertVal(cond, inRange, depth)
}
function convertVal(v, inRange, depth=0) {
  v = v.trim()
  if (v.startsWith('"') || v.startsWith("'")) return v
  if (/^\d/.test(v)) return v
  if (v === 'true' || v === 'false') return v
  if (v === 'nil' || v === 'null') return 'null'
  if (/^\.[A-Za-z_]/.test(v) || /^\$\./.test(v)) return convertField(v, inRange)
  if (v.startsWith('(')) return convertCond(v, inRange, depth+1)
  return `"${v}"`
}
function simpleActionExpr(a) {
  if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) return convertField(a, false)
  if (a === 'AppSubUrl') return '""'
  if (/^ctx\.Locale\.Tr\s+"/.test(a)) {
    const k = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)?.[1]
    return k ? `i18n("${k}")` : '""'
  }
  return '""'
}
function attrValToExpr(val) {
  const toks = tokenize(val)
  if (toks.length === 1 && toks[0].type === 'action') return `String(${simpleActionExpr(toks[0].value)} ?? "")`
  const stack = []; let result = '`'
  for (const tok of toks) {
    if (tok.type === 'text') {
      result += tok.value.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$(?=\{)/g,'\\$')
    } else {
      const a = tok.value
      if (a === 'AppSubUrl' || a === '.CsrfToken' || a === '$.CsrfToken') {}
      else if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) result += `\${String(${convertField(a,false)} ?? "")}`
      else if (/^ctx\.Locale\.Tr\s+"/.test(a)) {
        const k = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)?.[1]
        if (k) result += `\${i18n("${k}")}`
      }
      else if (/^if\s/.test(a)) { const cond = convertCond(a.slice(3).trim(), false); stack.push({type:'if',phase:'then'}); result += `\${(${cond}) ? \`` }
      else if (a === 'else') { const top = stack[stack.length-1]; if (top?.type==='if') { top.phase='else'; result += '` : `' } }
      else if (a === 'end') { const top = stack.pop(); if (top?.type==='if') result += top.phase==='else' ? '`}' : '` : ""}' }
    }
  }
  return result + '`'
}

function jsxAttrName(name) {
  if (name === 'class') return 'className'
  if (name === 'for') return 'htmlFor'
  return name
}

function preProcessDynamicAttrs(src) {
  let out = '', i = 0, iters = 0
  while (i < src.length) {
    iters++
    const eq = src.indexOf('="', i)
    if (eq === -1) { out += src.slice(i); break }
    let ns = eq - 1
    while (ns >= i && /[\w-]/.test(src[ns])) ns--
    ns++
    const attrName = src.slice(ns, eq)
    if (!attrName || !/^[a-zA-Z]/.test(attrName) || ns < i) { out += src.slice(i, eq + 2); i = eq + 2; continue }
    const vs = eq + 2
    let je = vs, found = -1
    while (je < src.length) { if (src[je] === '"') { found = je; break }; je++ }
    if (found === -1) { out += src.slice(i, eq + 2); i = eq + 2; continue }
    const attrVal = src.slice(vs, found)
    out += src.slice(i, ns)
    if (attrVal.includes('{{')) {
      out += `${jsxAttrName(attrName)}={${attrValToExpr(attrVal)}}`
    } else {
      out += `${jsxAttrName(attrName)}="${attrVal}"`
    }
    i = found + 1
  }
  return out
}

import { readFileSync } from 'fs'
const failingFiles = [
  'org/team/members.tmpl',
  'org/team/new.tmpl',
  'repo/home_sidebar_top.tmpl',
  'repo/view_content.tmpl',
]

for (const f of failingFiles) {
  const src = readFileSync(`/tmp/gitea/templates/${f}`, 'utf8')
  console.log(`Testing ${f}...`)
  try {
    const result = preProcessDynamicAttrs(src)
    console.log(`  preProcess OK, output size: ${result.length}`)
  } catch(e) {
    console.log(`  preProcess ERROR: ${e.message}`)
    console.log(e.stack?.slice(0,500))
  }
}
