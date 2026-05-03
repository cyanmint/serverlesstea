import { readFileSync } from 'fs'

function processText(text) {
  try {
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
  } catch(e) {
    return text + `/* ERR: ${e.message} */`
  }
}

// Test on a problematic text segment
const src = readFileSync('/tmp/gitea/templates/org/team/members.tmpl', 'utf8')

// Tokenize to find text segments
let i = 0
let segIdx = 0
while (i < src.length) {
  const s = src.indexOf('{{', i)
  let textChunk
  if (s === -1) { textChunk = src.slice(i); i = src.length }
  else { textChunk = src.slice(i, s); i = s }
  
  if (textChunk.length > 0) {
    segIdx++
    console.log(`Seg ${segIdx} (len=${textChunk.length}): testing...`)
    const start = Date.now()
    const result = processText(textChunk)
    const elapsed = Date.now() - start
    if (elapsed > 100) console.log(`  SLOW: ${elapsed}ms`)
  }
  
  if (i >= src.length) break
  // skip action
  const e = src.indexOf('}}', i + 2)
  if (e === -1) break
  i = e + 2
}
console.log('Done, segments:', segIdx)
