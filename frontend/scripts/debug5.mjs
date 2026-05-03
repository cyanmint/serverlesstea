// Test the full conversion pipeline on a single failing file, adding depth tracking
import { readFileSync } from 'fs'

// Override Error.stackTraceLimit
Error.stackTraceLimit = 5

const src = readFileSync('/tmp/gitea/templates/org/team/members.tmpl', 'utf8')

// Import the actual module to test - use dynamic import
// Just test if tokenize works first
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

// Test processText with problematic regex
function processText(text) {
  return text
    .replace(/\bclass=/g,    'className=')
    .replace(/\bfor=/g,      'htmlFor=')
    .replace(/\bchecked(?=[\s/>])/g, 'defaultChecked')
    .replace(/<br\s*>/gi,  '<br />')
    .replace(/<hr\s*>/gi,  '<hr />')
    .replace(/<img(\s[^>]*?)?\s*(?<!\/)>/gi,   (m, a) => `<img${a||''} />`)
    .replace(/<input(\s[^>]*?)?\s*(?<!\/)>/gi, (m, a) => `<input${a||''} />`)
    .replace(/<link(\s[^>]*?)?\s*(?<!\/)>/gi,  (m, a) => `<link${a||''} />`)
    .replace(/<meta(\s[^>]*?)?\s*(?<!\/)>/gi,  (m, a) => `<meta${a||''} />`)
    .replace(/\baction="([^"]*)"/g, 'data-action="$1"')
    .replace(/\bmethod="post"/gi, 'x')
}

// Tokenize and run processText on each text segment with timing
const tokens = tokenize(src)
console.log('total tokens:', tokens.length)
let idx = 0
for (const tok of tokens) {
  idx++
  if (tok.type === 'text') {
    const start = Date.now()
    try {
      processText(tok.value)
      const ms = Date.now() - start
      if (ms > 50) console.log(`Slow text[${idx}] ${ms}ms len=${tok.value.length}: ${tok.value.slice(0,100)}`)
    } catch(e) {
      console.log(`Error text[${idx}]:`, e.message, '\n  ', tok.value.slice(0,100))
    }
  }
}
console.log('processText test done')
