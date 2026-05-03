import { readFileSync } from 'fs'

// The processText function from translate-tmpl.mjs
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
    .replace(/\bmethod="post"/gi, 'method="post" onSubmit={x}')
}

// Load view_content.tmpl, simulate preProcess, then run processText on text segments
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

const failingFiles = [
  'org/team/members.tmpl',
  'repo/home_sidebar_top.tmpl',
  'repo/view_content.tmpl',
  'repo/editor/commit_form.tmpl',
]

for (const fname of failingFiles) {
  const src = readFileSync(`/tmp/gitea/templates/${fname}`, 'utf8')
  const tokens = tokenize(src)
  let errFound = false
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]
    if (tok.type !== 'text') continue
    const start = Date.now()
    try {
      processText(tok.value)
      const ms = Date.now() - start
      if (ms > 500) {
        console.log(`${fname}[${i}] SLOW ${ms}ms: ${tok.value.slice(0,200)}`)
        errFound = true
        break
      }
    } catch(e) {
      console.log(`${fname}[${i}] ERROR: ${e.message}: ${tok.value.slice(0,200)}`)
      errFound = true
      break
    }
  }
  if (!errFound) console.log(`${fname}: all ${tokens.filter(t=>t.type==='text').length} text segments OK`)
}
