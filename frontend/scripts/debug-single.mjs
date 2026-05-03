import { readFileSync } from 'fs'
// Directly inline the failing logic and add a call counter
let callCount = 0

function convertCond(cond, inRange, depth = 0) {
  callCount++
  if (depth > 50) throw new Error(`Infinite recursion in convertCond: ${cond.slice(0, 100)}`)
  cond = cond.trim()
  
  for (const [op, jsOp] of [['eq','==='],['ne','!=='],['gt','>'],['lt','<'],['ge','>='],['le','<=']]) {
    const m = cond.match(new RegExp(`^${op}\\s+(\\S+)\\s+(.+)$`))
    if (m) return `left ${jsOp} right`
  }
  if (cond.startsWith('not ')) return `!(${convertCond(cond.slice(4).trim(), inRange, depth+1)})`
  if (cond.startsWith('or '))  return '(' + parseArgs(cond.slice(3)).map(p => convertCond(p, inRange, depth+1)).join(' || ') + ')'
  if (cond.startsWith('and ')) return '(' + parseArgs(cond.slice(4)).map(p => convertCond(p, inRange, depth+1)).join(' && ') + ')'
  if (cond.startsWith('(') && cond.endsWith(')')) {
    let d = 0, end = -1
    for (let i = 0; i < cond.length; i++) {
      if (cond[i] === '(') d++
      else if (cond[i] === ')') { d--; if (d === 0) { end = i; break } }
    }
    if (end === cond.length - 1) return convertCond(cond.slice(1, -1), inRange, depth+1)
  }
  return `val(${cond.slice(0,20)})`
}

function parseArgs(str) {
  const args = []
  let cur = '', depth = 0
  for (const ch of str) {
    if (ch === '(') { depth++; cur += ch }
    else if (ch === ')') { depth--; cur += ch }
    else if (ch === ' ' && depth === 0) { if (cur) { args.push(cur); cur = '' } }
    else { cur += ch }
  }
  if (cur) args.push(cur)
  return args
}

// tokenize
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

const src = readFileSync('/tmp/gitea/templates/org/team/members.tmpl', 'utf8')
const tokens = tokenize(src)
let tokenIdx = 0
for (const tok of tokens) {
  tokenIdx++
  if (tok.type === 'action' && /^if\s/.test(tok.value)) {
    try {
      const cond = tok.value.slice(3).trim()
      const result = convertCond(cond, false)
      console.log(`if[${tokenIdx}]: ok, calls=${callCount}, result=${result.slice(0,60)}`)
      callCount = 0
    } catch(e) {
      console.log(`if[${tokenIdx}]: ERROR: ${e.message}`)
      console.log(`  full cond: ${tok.value.slice(0,200)}`)
    }
  }
}
console.log('All done')
