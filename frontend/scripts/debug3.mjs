import { readFileSync } from 'fs'

function jsxAttrName(name) {
  if (name === 'class') return 'className'
  if (name === 'for')   return 'htmlFor'
  return name
}

function preProcessDynamicAttrs(src) {
  let out = '', i = 0, iters = 0
  while (i < src.length) {
    iters++
    if (iters > 100000) { console.log('TOO MANY ITERS at i=', i); break }
    const eq = src.indexOf('="', i)
    if (eq === -1) { out += src.slice(i); break }
    let ns = eq - 1
    while (ns >= i && /[\w-]/.test(src[ns])) ns--
    ns++
    const attrName = src.slice(ns, eq)
    if (!attrName || !/^[a-zA-Z]/.test(attrName) || ns < i) {
      out += src.slice(i, eq + 2); i = eq + 2; continue
    }
    const vs = eq + 2
    let je = vs, found = -1
    while (je < src.length) {
      if (src[je] === '"') { found = je; break }
      je++
    }
    if (found === -1) { out += src.slice(i, eq + 2); i = eq + 2; continue }
    const attrVal = src.slice(vs, found)
    out += src.slice(i, ns)
    if (attrVal.includes('{{')) {
      console.log(`Dynamic attr: ${attrName}="${attrVal.slice(0,80)}"`)
      out += `CONVERTED`
    } else {
      out += `${jsxAttrName(attrName)}="${attrVal}"`
    }
    i = found + 1
  }
  return out
}

const src = readFileSync('/tmp/gitea/templates/org/team/members.tmpl', 'utf8')
console.log('src size:', src.length)
const result = preProcessDynamicAttrs(src)
console.log('result size:', result.length)
