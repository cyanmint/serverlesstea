import { readFileSync } from 'fs'
// Replicate processAction with depth tracking

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
  if (expr.startsWith('$.')) return 'props.' + expr.slice(2).split('.').map(lcFirst).join('?.')
  if (expr.startsWith('.')) {
    const rest = expr.slice(1)
    if (!rest) return inRange ? 'item' : 'props'
    return (inRange ? 'item' : 'props') + '.' + rest.split('.').map(lcFirst).join('?.')
  }
  if (/^\$\w+$/.test(expr)) return `(undefined /* ${expr} */)`
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
  if (depth > 30) return 'true /* overflow */'
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
      if (cond[i] === '(') d++ ; else if (cond[i] === ')') { d--; if (d === 0) { end = i; break } }
    }
    if (end > 0 && end === cond.length - 1) return convertCond(cond.slice(1, -1), inRange, depth+1)
  }
  return convertVal(cond, inRange)
}

function processAction(a, state) {
  if (a.startsWith('/*') && a.endsWith('*/')) return `{/* ${a.slice(2,-2).trim()} */}`
  if (/^define\s+"/.test(a)) { state.stack.push({type:'define'}); return '' }
  if (/^template\s+"base\/head"/.test(a)) return ''
  if (/^template\s+"base\/footer"/.test(a)) return ''
  if (/^template\s+"base\/alert"/.test(a)) return '{/* alert */}'
  const tmpl = a.match(/^template\s+"([^"]+)"/)
  if (tmpl) return `{/* template: ${tmpl[1]} */}`
  const tr = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)
  if (tr) return `{i18n("${tr[1]}")}`
  if (a === 'AppSubUrl') return ''
  if (a === 'AppName') return '{String(props.appName ?? "")}'
  if (a === 'AssetUrlPrefix') return '{"/assets"}'
  if (a === '.CsrfToken' || a === '$.CsrfToken') return ''
  if (/^\$\w+\s*:=/.test(a)) return `{/* $${a.match(/^\$(\w+)/)[1]} */}`
  if (/^\$\w+$/.test(a)) return `{/* ${a} */}`
  if (a === '.') return state.rangeDepth > 0 ? '{item as any}' : '{props as any}'
  if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) return `{${convertField(a, state.rangeDepth > 0)} as any}`
  if (/^if\s/.test(a)) {
    const cond = convertCond(a.slice(3).trim(), state.rangeDepth > 0)
    state.stack.push({type:'if', phase:'then', cond}); return `{(${cond}) ? (<>`
  }
  if (/^else if\s/.test(a)) {
    const top = state.stack[state.stack.length-1]
    const cond = convertCond(a.slice(8).trim(), state.rangeDepth > 0)
    if (top?.type==='if') { top.cond=cond; top.phase='then'; return `</>) : null} {(${cond}) ? (<>` }
    return '{/* else if */}'
  }
  if (a === 'else') {
    const top = state.stack[state.stack.length-1]
    if (top?.type==='if') { top.phase='else'; return '</>) : (<>' }
    return '{/* else */}'
  }
  if (a === 'end') {
    const top = state.stack.pop()
    if (!top) return ''
    if (top.type==='define') return ''
    if (top.type==='if') return top.phase==='else' ? '</>)}' : '</>) : null}'
    if (top.type==='range') { state.rangeDepth--; return '</React.Fragment>))}' }
    if (top.type==='with') return '</>) }'
    return ''
  }
  if (/^range\s/.test(a)) {
    let expr = a.slice(6).trim()
    const assign = expr.match(/^(?:\$\w+\s*,\s*)?\$\w+\s*:=\s*(.+)$/)
    if (assign) expr = assign[1].trim()
    const items = convertField(expr, state.rangeDepth > 0)
    state.stack.push({type:'range'}); state.rangeDepth++
    return `{((${items}) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>`
  }
  if (/^with\s/.test(a)) {
    const expr = convertField(a.slice(5).trim(), state.rangeDepth > 0)
    state.stack.push({type:'with'}); return `{(${expr}) && (<>`
  }
  const svg = a.match(/^svg\s+"([^"]+)"/)
  if (svg) return `<span className="svg-icon" aria-label="${svg[1]}"></span>`
  const safe = a.replace(/\*\//g, '* /').replace(/`/g, "'")
  return `{/* TODO: {{${safe}}} */}`
}

const files = [
  'org/team/members.tmpl',
  'org/team/new.tmpl',
  'repo/home_sidebar_top.tmpl',
  'repo/view_content.tmpl',
  'repo/editor/commit_form.tmpl',
]

for (const fname of files) {
  const src = readFileSync(`/tmp/gitea/templates/${fname}`, 'utf8')
  const tokens = tokenize(src)
  const state = { stack: [], rangeDepth: 0 }
  let errFound = false
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]
    if (tok.type !== 'action') continue
    const start = Date.now()
    try {
      processAction(tok.value, state)
      const ms = Date.now() - start
      if (ms > 100) {
        console.log(`${fname}[${i}] SLOW ${ms}ms: ${tok.value.slice(0,200)}`)
        errFound = true
        break
      }
    } catch(e) {
      console.log(`${fname}[${i}] ERROR: ${e.message}: ${tok.value.slice(0,100)}`)
      errFound = true
      break
    }
  }
  if (!errFound) console.log(`${fname}: all action tokens OK`)
}
