import { readFileSync, writeFileSync } from 'fs'

// Wrap the whole thing to catch the specific error point
const files = [
  'org/team/members.tmpl',
  'org/team/new.tmpl',
  'repo/home_sidebar_top.tmpl',
  'repo/view_content.tmpl',
]

for (const f of files) {
  try {
    const src = readFileSync(`/tmp/gitea/templates/${f}`, 'utf8')
    // Simulate what translate-tmpl.mjs does - but trace
    const removeCsrf = s => s.replace(/<input[^>]*name=["']_csrf["'][^>]*\/?>/gi, '')
    const s2 = removeCsrf(src)
    console.log(`${f}: removeCsrf ok`)
    
    // Count = signs to see if pre-processing would loop
    const eqCount = (s2.match(/="/g) || []).length
    console.log(`${f}: ${eqCount} =" sequences`)
  } catch(e) {
    console.log(`${f}: ERROR in setup: ${e.message}`)
  }
}
