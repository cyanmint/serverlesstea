#!/usr/bin/env node
/**
 * translate-tmpl.mjs
 * Converts Gitea Go HTML templates → React TSX functional components.
 * Usage: node frontend/scripts/translate-tmpl.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)

const FRONTEND_DIR  = join(__dirname, '..')
const TEMPLATES_DIR = join(FRONTEND_DIR, 'gitea-templates')
const OUT_DIR       = join(FRONTEND_DIR, 'src', 'pages-generated')
const SKIP_DIRS     = new Set(['api', 'mail', 'devtest', 'swagger'])
// Layout-fragment templates that contain unbalanced HTML (open/close tags split
// across multiple included partials) or raw JavaScript — they can't be cleanly
// rendered as standalone React components.
const SKIP_FILES    = new Set([
  'base/head.tmpl',
  'base/footer.tmpl',
  'base/head_script.tmpl',
  'base/head_style.tmpl',
  'admin/layout_head.tmpl',
  'admin/layout_footer.tmpl',
  'org/settings/layout_head.tmpl',
  'org/settings/layout_footer.tmpl',
  'user/settings/layout_head.tmpl',
  'user/settings/layout_footer.tmpl',
  'repo/settings/layout_head.tmpl',
  'repo/settings/layout_footer.tmpl',
  // HTML tags that intentionally span multiple {{if}} blocks — inherently
  // unbalanced JSX; skip rather than emit broken fragments.
  'repo/commit_sign_badge.tmpl',
  // SVG graph template with complex Go template math/eval functions
  // that cannot be statically translated.
  'repo/graph/svgcontainer.tmpl',
  // HTML tags that span across {{if}} block boundaries in the original template
  'repo/issue/view_content/comments.tmpl',
])

let written = 0
let skipped = 0

// ── Entry ────────────────────────────────────────────────────────────────────
function main() {
  if (!existsSync(TEMPLATES_DIR)) {
    console.error(`Templates dir not found: ${TEMPLATES_DIR}`)
    process.exit(1)
  }
  mkdirSync(OUT_DIR, { recursive: true })

  // Collect the set of .tsx files that will be (re-)generated this run
  const willGenerate = new Set(
    collectFiles(TEMPLATES_DIR, '').map(r => r.replace(/\.tmpl$/, '.tsx'))
  )

  // Delete any .tsx files in OUT_DIR that are no longer generated (stale files
  // from skipped templates or renamed sources).
  function cleanStale(dir, rel) {
    for (const name of readdirSync(dir)) {
      const fullRel = rel ? `${rel}/${name}` : name
      const full = join(dir, name)
      if (statSync(full).isDirectory()) { cleanStale(full, fullRel); continue }
      if (name.endsWith('.tsx') && !willGenerate.has(fullRel)) {
        rmSync(full)
      }
    }
  }
  if (existsSync(OUT_DIR)) cleanStale(OUT_DIR, '')

  for (const relPath of collectFiles(TEMPLATES_DIR, '')) {
    processFile(relPath)
  }
  console.log(`\nDone. Written: ${written}, Skipped: ${skipped}`)
}

function collectFiles(dir, rel) {
  const out = []
  for (const name of readdirSync(dir)) {
    const fullRel  = rel ? `${rel}/${name}` : name
    const topLevel = fullRel.split('/')[0]
    if (SKIP_DIRS.has(topLevel)) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...collectFiles(full, fullRel))
    else if (name.endsWith('.tmpl') && !SKIP_FILES.has(fullRel)) out.push(fullRel)
  }
  return out
}

function processFile(relPath) {
  const src     = readFileSync(join(TEMPLATES_DIR, relPath), 'utf8')
  const relTsx  = relPath.replace(/\.tmpl$/, '.tsx')
  const outPath = join(OUT_DIR, relTsx)
  mkdirSync(dirname(outPath), { recursive: true })
  try {
    writeFileSync(outPath, convertTemplate(src, relTsx), 'utf8')
    written++
  } catch (e) {
    console.error(`  ERROR ${relPath}: ${e.message}`)
    skipped++
  }
}

// ── Main conversion ───────────────────────────────────────────────────────────
function convertTemplate(src, relTsx) {
  // 1. Strip CSRF inputs
  src = src.replace(/<input[^>]*name=["']_csrf["'][^>]*\/?>/gi, '')

  // 1b. Strip HTML comments that may contain {{ }} actions — converting them
  //     to JSX comments now ensures the tokenizer sees a clean text token.
  //     The content is preserved inside {/* */} so intent is not lost.
  src = src.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/* ${c.replace(/\*\//g, '* /').trim()} */}`)

  // 2. Pre-process dynamic attribute values (those containing {{ }})
  src = preProcessDynamicAttrs(src)

  // 3. Tokenize remaining {{ }} blocks
  const tokens = tokenize(src)

  // 4. Convert tokens — thread `inTag` state so processText knows whether the
  //    current token starts inside an HTML opening tag (attribute context) or
  //    in text content.
  const state = { stack: [], rangeDepth: 0, suppressDepth: 0 }
  let inTagCtx = false  // true when previous output ended inside an open tag
  let body  = tokens.map(t => {
    if (state.suppressDepth > 0) {
      // We're inside an {{if false}}...{{end}} block. Only watch for 'end'
      // to pop the suppress depth; everything else is dropped.
      if (t.type === 'action') {
        if (/^if[\s(]/.test(t.value) || /^with\s/.test(t.value) || /^range\s/.test(t.value) || /^define\s/.test(t.value)) {
          state.suppressDepth++
        } else if (t.value === 'end') {
          state.suppressDepth--
          if (state.suppressDepth > 0) return ''
          // suppressDepth reached 0: pop the if-false marker off the stack
          state.stack.pop()
        }
      }
      return ''
    }
    if (t.type === 'text') {
      const out = processText(t.value, inTagCtx)
      // Update inTag context: does the processed text end inside an open tag?
      inTagCtx = endsInsideOpenTag(out, inTagCtx)
      return out
    }
    // Action tokens produce inline JSX — preserve the current inTag context
    // because Go template actions can appear inside opening HTML tags (e.g.
    // conditional attributes like <div {{if .Foo}}class="x"{{end}}>).
    // The processAction output never contains raw HTML `>` that would close a
    // tag, so inTagCtx is unchanged.
    return processAction(t.value, state)
  }).join('')

  // 5. Post-process: fix conditional boolean/value attrs inside open tags
  //    {(cond) ? (<>ATTR</>) : null}  →  {...(cond ? {"ATTR": true/val} : {})}
  //    Handles conditions with nested parens and attribute=value patterns.
  body = fixConditionalAttrs(body)

  // 6. Post-process: self-close void elements (must run on full body because
  //    tokens like {{if}}checked{{end}} can split the tag across multiple tokens).
  //    Uses an expression-aware scan so `>` inside JSX `{...}` is not mistaken
  //    for the end of the element.
  for (const tag of ['area', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']) {
    body = selfCloseVoidTag(body, tag)
  }

  // 7. Post-process: strip {/* comment */} that appear inside JSX opening tags
  //    (TypeScript's JSX parser only allows {…spread} inside open tags).
  body = stripInlineJsxComments(body)

  // 8. Post-process: convert attribute names containing dots to spread syntax.
  //    Dots are invalid in JSX attribute names but valid in HTML data-* names.
  //    e.g. data-modal-form.action={expr}  →  {...{"data-modal-form.action": expr}}
  //         data-x.y="val"                 →  {...{"data-x.y": "val"}}
  body = fixDottedAttrNames(body)

  // 5. Compute component name and import depth
  const parts    = relTsx.replace(/\.tsx$/, '').split('/')
  const stem     = parts[parts.length - 1]
  const depth    = parts.length - 1          // dirs above file inside pages-generated
  const compName = toPascalCase(stem)
  const i18nPath = '../'.repeat(depth + 1) + 'lib/i18n'

  return [
    `// @ts-nocheck`,
    `import React from 'react'`,
    `import { i18n } from '${i18nPath}'`,
    ``,
    `export default function ${compName}(props: Record<string, unknown>) {`,
    `  return (<>`,
    body,
    `  </>)`,
    `}`,
    ``,
  ].join('\n')
}

// ── Pre-process: convert dynamic attribute values to JSX ─────────────────────
// attr="...{{action}}..."  →  jsxAttr={jsxExpr}
function preProcessDynamicAttrs(src) {
  let out = ''
  let i   = 0

  while (i < src.length) {
    // Skip over {{ }} blocks — do NOT process attribute patterns inside them
    if (src[i] === '{' && src[i + 1] === '{') {
      const end = src.indexOf('}}', i + 2)
      if (end === -1) { out += src.slice(i); break }
      out += src.slice(i, end + 2)
      i    = end + 2
      continue
    }

    // Find next =" (start of potential attribute value) — stop at the next {{ }}
    const nextAction = src.indexOf('{{', i)
    const eq = src.indexOf('="', i)
    if (eq === -1) { out += src.slice(i); break }
    // If the next {{ }} comes before the =" , output text up to it and loop
    if (nextAction !== -1 && nextAction < eq) {
      out += src.slice(i, nextAction)
      i    = nextAction
      continue
    }

    // Walk back from eq to find the attribute name
    let ns = eq - 1
    while (ns >= i && /[\w-]/.test(src[ns])) ns--
    ns++
    const attrName = src.slice(ns, eq)

    // Skip if not a valid attr name or we haven't advanced
    if (!attrName || !/^[a-zA-Z]/.test(attrName) || ns < i) {
      out += src.slice(i, eq + 2)
      i    = eq + 2
      continue
    }

    // Find closing quote — skip over {{ }} blocks (which may contain internal quotes)
    const vs = eq + 2
    let je   = vs
    let found = -1
    while (je < src.length) {
      if (src[je] === '{' && src[je+1] === '{') {
        // skip to matching }}
        const end2 = src.indexOf('}}', je + 2)
        je = end2 === -1 ? src.length : end2 + 2
        continue
      }
      if (src[je] === '"') { found = je; break }
      je++
    }
    if (found === -1) { out += src.slice(i, eq + 2); i = eq + 2; continue }

    const attrVal = src.slice(vs, found)
    out += src.slice(i, ns)   // text before attr name

    if (attrVal.includes('{{')) {
      const jsxAttr = jsxAttrName(attrName)
      const expr    = attrValToExpr(attrVal)
      out += `${jsxAttr}={${expr}}`
    } else {
      out += `${jsxAttrName(attrName)}="${attrVal}"`
    }

    i = found + 1  // skip closing quote
  }

  return out
}

function jsxAttrName(name) {
  if (name === 'class') return 'className'
  if (name === 'for')   return 'htmlFor'
  return name
}

// Convert an attribute value (may contain {{ }}) to a JS expression
function attrValToExpr(val) {
  const toks = tokenize(val)

  // Entire value is one simple action
  if (toks.length === 1 && toks[0].type === 'action') {
    const expr = simpleActionExpr(toks[0].value)
    return `String(${expr} ?? "")`
  }

  // Build a template literal
  const stack = []
  let result  = '`'

  for (const tok of toks) {
    if (tok.type === 'text') {
      result += tok.value
        .replace(/\\/g, '\\\\')
        .replace(/`/g,  '\\`')
        .replace(/\$(?=\{)/g, '\\$')
    } else {
      const a = tok.value
      if (a === 'AppSubUrl' || a === '.CsrfToken' || a === '$.CsrfToken') {
        // strip
      } else if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) {
        result += `\${String(${convertField(a, false)} ?? "")}`
      } else if (/^ctx\.Locale\.Tr\s+"/.test(a)) {
        const k = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)[1]
        result += `\${i18n("${k}")}`
      } else if (/^if\s/.test(a)) {
        const cond = convertCond(a.slice(3).trim(), false)
        stack.push({ type: 'if', phase: 'then' })
        result += `\${(${cond}) ? \``
      } else if (a === 'else') {
        const top = stack[stack.length - 1]
        if (top?.type === 'if') { top.phase = 'else'; result += '` : `' }
      } else if (a === 'end') {
        const top = stack.pop()
        if (top?.type === 'if') result += top.phase === 'else' ? '`}' : '` : ""}'
      } else if (/^\$\w+\s*:=/.test(a) || /^\$\w+$/.test(a)) {
        // strip variable refs/assignments
      } else {
        // strip unknown
      }
    }
  }

  result += '`'
  return result
}

function simpleActionExpr(a) {
  if (a === 'AppSubUrl')  return '""'
  if (a === '.CsrfToken' || a === '$.CsrfToken') return '""'
  if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) return convertField(a, false)
  if (/^ctx\.Locale\.Tr\s+"/.test(a)) {
    const k = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)[1]
    return `i18n("${k}")`
  }
  return '""'
}

// ── Tokenizer ─────────────────────────────────────────────────────────────────
function tokenize(src) {
  const tokens = []
  let i = 0
  while (i < src.length) {
    const s = src.indexOf('{{', i)
    if (s === -1) { if (i < src.length) tokens.push({ type: 'text', value: src.slice(i) }); break }
    if (s > i)    tokens.push({ type: 'text', value: src.slice(i, s) })
    // Handle Go template comments {{/* ... */}} specially:
    // they can contain {{ and }} so we scan for */}} rather than just }}
    if (src[s + 2] === '/' && src[s + 3] === '*') {
      const endComment = src.indexOf('*/}}', s + 4)
      if (endComment === -1) { tokens.push({ type: 'text', value: src.slice(s) }); break }
      const commentBody = src.slice(s + 2, endComment + 2)  // includes /* ... */
      tokens.push({ type: 'action', value: commentBody.trim() })
      i = endComment + 4  // skip past */}}
      continue
    }
    const e = src.indexOf('}}', s + 2)
    if (e === -1) { tokens.push({ type: 'text', value: src.slice(s) }); break }
    tokens.push({ type: 'action', value: src.slice(s + 2, e).trim().replace(/^-\s*/, '').replace(/\s*-$/, '').trim() })
    i = e + 2
  }
  return tokens
}

// ── HTML text fixes ──────────────────────────────────────────────────────────
function processText(text, startInTag = false) {
  text = text
    // Strip DOCTYPE (invalid in JSX)
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    // HTML comments are converted before tokenization (step 1b), but handle any
    // residual single-token comments here as a safety net.
    .replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/* ${c.replace(/\*\//g, '* /').trim()} */}`)
    // HTML attrs not already handled by preProcessDynamicAttrs (static values)
    .replace(/\bclass=/g,    'className=')
    .replace(/\bfor=/g,      'htmlFor=')
    .replace(/\bchecked(?=[\s/>])/g, 'defaultChecked')
    .replace(/\bcolspan=/gi,  'colSpan=')
    .replace(/\browspan=/gi,  'rowSpan=')
    .replace(/\btabindex=/gi, 'tabIndex=')
    .replace(/\baccesskey=/gi,'accessKey=')
    // Void element self-closing is handled in the full-body post-process step.
    // form action → data-action
    .replace(/\baction="([^"]*)"/g, 'data-action="$1"')
    // method=post → keep + add onSubmit
    .replace(
      /\bmethod="post"/gi,
      'method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}'
    )

  // Escape literal { and } in HTML text content (not inside HTML tags).
  // In text tokens, all { } are raw HTML characters unless they appear inside
  // a tag's attribute area. JSX expressions in text positions come from
  // processAction, not processText — so we can safely escape all text-content
  // braces here.  Pass startInTag so continuation tokens (after {{if}} inside
  // a tag) are handled correctly.
  return escapeTextContentBraces(text, startInTag)
}

// Walk `text` and escape `{` / `}` that appear OUTSIDE of an HTML tag
// (i.e., not inside `<tagname ... >`).  Characters inside tags (attributes,
// JSX attribute expressions like `{expr}`) are passed through unchanged.
// `startInTag`: true when the text begins inside an already-open HTML tag
// (continuation after a Go template action inside a tag).
function escapeTextContentBraces(text, startInTag = false) {
  let result = ''
  let i = 0
  let inTag = startInTag  // true between `<` and the matching `>`
  let attrExprDepth = 0   // depth of `{...}` expressions inside a tag

  while (i < text.length) {
    const c = text[i]

    if (inTag) {
      if (c === '{') { attrExprDepth++; result += c; i++; continue }
      if (c === '}') { if (attrExprDepth > 0) attrExprDepth--; result += c; i++; continue }
      if (attrExprDepth === 0 && c === '>') { inTag = false; result += c; i++; continue }
      result += c; i++; continue
    }

    // Text content position
    if (c === '<') {
      // Enter inTag state for ANY tag (opening or closing — both have a `>`)
      inTag = true
      result += c; i++; continue
    }
    if (c === '{') { result += "{'{'}" ; i++; continue }
    if (c === '}') { result += "{'}'}"; i++; continue }
    result += c; i++
  }
  return result
}

// Compute whether `text` ends inside an open HTML tag.
// Used to thread the inTag context between processText calls.
function endsInsideOpenTag(text, startInTag) {
  let inTag = startInTag
  let attrExprDepth = 0
  let i = 0
  while (i < text.length) {
    const c = text[i]
    if (inTag) {
      if (c === '{') { attrExprDepth++; i++; continue }
      if (c === '}') { if (attrExprDepth > 0) attrExprDepth--; i++; continue }
      if (attrExprDepth === 0 && c === '>') { inTag = false; i++; continue }
      i++; continue
    }
    if (c === '<') { inTag = true; i++; continue }
    i++
  }
  return inTag
}

// ── Action token converter ────────────────────────────────────────────────────
function processAction(a, state) {
  // Go comment
  if (a.startsWith('/*') && a.endsWith('*/')) {
    const c = a.slice(2, -2).trim().replace(/\*\//g, '* /').replace(/`/g, "'")
    return `{/* ${c} */}`
  }

  // define wrapper — drop the wrapper, keep body
  if (/^define\s+"/.test(a)) { state.stack.push({ type: 'define' }); return '' }

  // Template includes
  if (/^template\s+"base\/head"/.test(a))   return ''
  if (/^template\s+"base\/footer"/.test(a)) return ''
  if (/^template\s+"base\/alert"/.test(a))  return '{/* alert */}'
  const tmpl = a.match(/^template\s+"([^"]+)"/)
  if (tmpl) return `{/* template: ${tmpl[1]} */}`

  // i18n
  const tr = a.match(/^ctx\.Locale\.Tr\s+"([^"]+)"/)
  if (tr) return `{i18n("${tr[1]}")}`

  // Global template vars
  if (a === 'AppSubUrl')            return ''
  if (a === 'AppName')              return '{String(props.appName ?? "")}'
  if (a === 'AssetUrlPrefix')       return '{"/assets"}'
  if (/^(AppUrl|AppVer|AppDomain)$/.test(a)) return '{""}'

  // CSRF — strip
  if (a === '.CsrfToken' || a === '$.CsrfToken') return ''

  // Variable assignment — drop
  if (/^\$\w+\s*:=/.test(a)) {
    const v = a.match(/^\$(\w+)/)[1]
    return `{/* $${v} */}`
  }

  // Variable reference — convert to props.varName (camelCase)
  if (/^\$\w+$/.test(a)) return `{props.${lcFirst(a.slice(1))} as any}`

  // Dot alone (current item in range, or props)
  if (a === '.') return state.rangeDepth > 0 ? '{item as any}' : '{props as any}'

  // Field access: .X or $.X or .X.Y.Z
  if (/^\.[A-Za-z_]/.test(a) || /^\$\./.test(a)) {
    const inRange = state.rangeDepth > 0
    return `{${convertField(a, inRange)} as any}`
  }

  // ── Control flow ─────────────────────────────────────────────────────────

  if (/^if[\s(]/.test(a)) {
    const condStr = a.slice(2).trim()
    // {{if false}} — suppress entire block (IDE balancing stubs)
    if (condStr === 'false') {
      state.stack.push({ type: 'if-false' })
      state.suppressDepth++
      return ''
    }
    const cond = convertCond(condStr, state.rangeDepth > 0)
    state.stack.push({ type: 'if', phase: 'then', cond })
    return `{(${cond}) ? (<>`
  }

  if (/^else if[\s(]/.test(a)) {
    const top  = state.stack[state.stack.length - 1]
    const cond = convertCond(a.slice(7).trim(), state.rangeDepth > 0)
    if (top?.type === 'if') {
      top.cond  = cond
      top.phase = 'then'
      return `</>) : null} {(${cond}) ? (<>`
    }
    return '{/* else if */}'
  }

  if (a === 'else') {
    const top = state.stack[state.stack.length - 1]
    if (top?.type === 'if') { top.phase = 'else'; return '</>) : (<>' }
    return '{/* else */}'
  }

  if (a === 'end') {
    const top = state.stack.pop()
    if (!top) return ''
    if (top.type === 'define') return ''
    if (top.type === 'if')    return top.phase === 'else' ? '</>)}' : '</>) : null}'
    if (top.type === 'range') { state.rangeDepth--; return '</React.Fragment>))}' }
    if (top.type === 'with')  return '</>) }'
    return ''
  }

  if (/^range\s/.test(a)) {
    let expr = a.slice(6).trim()
    // strip "range $k, $v := .Items" → ".Items"
    const assign = expr.match(/^(?:\$\w+\s*,\s*)?\$\w+\s*:=\s*(.+)$/)
    if (assign) expr = assign[1].trim()
    const items = convertField(expr, state.rangeDepth > 0)
    state.stack.push({ type: 'range' })
    state.rangeDepth++
    return `{((${items}) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>`
  }

  if (/^with\s/.test(a)) {
    let expr = a.slice(5).trim()
    // Strip "with $var := .Foo" → just use ".Foo" as the condition
    const withAssign = expr.match(/^\$\w+\s*:=\s*(.+)$/)
    if (withAssign) expr = withAssign[1].trim()
    const cond = convertField(expr, state.rangeDepth > 0)
    state.stack.push({ type: 'with' })
    return `{(${cond}) && (<>`
  }

  // SVG helper
  const svg = a.match(/^svg\s+"([^"]+)"/)
  if (svg) return `<span className="svg-icon" aria-label="${svg[1]}"></span>`

  // Fallback — emit as JSX comment so no bare {{ }} remain
  const safe = a.replace(/\*\//g, '* /').replace(/`/g, "'")
  return `{/* TODO: {{${safe}}} */}`
}

// ── Expression helpers ────────────────────────────────────────────────────────

// Convert a field expression (.X, $.X, .X.Y.Z, or literal) to JS
function convertField(expr, inRange) {
  expr = expr.trim()

  // Strip outer parentheses (e.g. from `range (index ...)`)
  if (expr.startsWith('(') && expr.endsWith(')')) {
    return convertField(expr.slice(1, -1).trim(), inRange)
  }

  // Handle Go built-in `index MAP KEY` → MAP[KEY]
  const indexMatch = expr.match(/^index\s+(\S+)\s+(.+)$/)
  if (indexMatch) {
    const mapExpr = convertField(indexMatch[1], inRange)
    const keyExpr = convertField(indexMatch[2].trim(), inRange)
    return `${mapExpr}?.[${keyExpr}]`
  }

  let prefix, restStr
  if (expr.startsWith('$.')) {
    prefix  = 'props'
    restStr = expr.slice(2)
  } else if (expr.startsWith('.')) {
    prefix  = inRange ? 'item' : 'props'
    restStr = expr.slice(1)
    if (!restStr) return prefix
  } else if (/^\$\w+$/.test(expr)) {
    return `props.${lcFirst(expr.slice(1))}`
  } else {
    return expr
  }

  // Split by '.' to get parts, but a part may contain method call args after a space.
  // Example: ".Team.UnitAccessMode ctx $unit.Type" splits to ["Team", "UnitAccessMode ctx $unit", "Type"]
  // When a part contains a space, everything from the space onward (plus remaining parts) are args.
  const rawParts  = restStr.split('.')
  const jsParts   = []
  let   argSuffix = ''

  for (let i = 0; i < rawParts.length; i++) {
    const part     = rawParts[i]
    const spaceIdx = findUnquotedSpace(part)
    if (spaceIdx !== -1) {
      // Method call: this part has args after a space
      const methodName    = part.slice(0, spaceIdx)
      const argsFromPart  = part.slice(spaceIdx + 1)
      // Remaining rawParts (e.g., from "$unit.Type" split earlier) are also part of the args
      const remainingDots = rawParts.slice(i + 1)
      const argsStr       = remainingDots.length > 0
        ? argsFromPart + '.' + remainingDots.join('.')
        : argsFromPart
      jsParts.push(lcFirst(methodName))
      const jsArgs = parseArgs(argsStr).map(a => convertVal(a, inRange)).join(', ')
      argSuffix = `?.(${jsArgs})`
      break
    }
    jsParts.push(lcFirst(part))
  }

  return prefix + (jsParts.length > 0 ? '.' + jsParts.join('?.') : '') + argSuffix
}

// Find the index of the first space that is NOT inside single or double quotes.
function findUnquotedSpace(s) {
  let inQuote = false, quoteChar = ''
  for (let i = 0; i < s.length; i++) {
    if (!inQuote && (s[i] === '"' || s[i] === "'")) { inQuote = true; quoteChar = s[i] }
    else if (inQuote && s[i] === quoteChar)          { inQuote = false }
    else if (!inQuote && s[i] === ' ')               { return i }
  }
  return -1
}

// Split "lhs rhs" where lhs may be a balanced parenthesised group
function splitBinArgs(str) {
  str = str.trim()
  if (str.startsWith('(')) {
    let d = 0, i = 0
    while (i < str.length) {
      if (str[i] === '(') d++
      else if (str[i] === ')') { d--; if (d === 0) { i++; break } }
      i++
    }
    return [str.slice(0, i), str.slice(i).trim()]
  }
  const sp = str.indexOf(' ')
  if (sp === -1) return [str, '']
  return [str.slice(0, sp), str.slice(sp + 1).trim()]
}

// Convert a Go template condition string to a JS boolean expression
function convertCond(cond, inRange, depth = 0) {
  if (depth > 30) return 'true /* depth limit */'
  cond = cond.trim()

  // call FUNC ARG1 ARG2... — function/method call
  if (cond.startsWith('call ')) {
    const args   = parseArgs(cond.slice(5).trim())
    const fn     = args[0]
    const jsArgs = args.slice(1).map(a => convertVal(a, inRange)).join(', ')
    return `${convertVal(fn, inRange)}?.(${jsArgs})`
  }

  // eq / ne / gt / lt / ge / le — use splitBinArgs to handle (func arg) correctly
  for (const [op, jsOp] of [['eq','==='],['ne','!=='],['gt','>'],['lt','<'],['ge','>='],['le','<=']]) {
    if (cond.startsWith(op + ' ')) {
      const [lhs, rhs] = splitBinArgs(cond.slice(op.length + 1).trim())
      if (lhs && rhs) return `${convertCond(lhs, inRange, depth+1)} ${jsOp} ${convertCond(rhs, inRange, depth+1)}`
    }
  }

  if (cond.startsWith('not ')) {
    return `!(${convertCond(cond.slice(4).trim(), inRange, depth+1)})`
  }

  if (cond.startsWith('or ')) {
    return '(' + parseArgs(cond.slice(3)).map(p => convertCond(p, inRange, depth+1)).join(' || ') + ')'
  }

  if (cond.startsWith('and ')) {
    return '(' + parseArgs(cond.slice(4)).map(p => convertCond(p, inRange, depth+1)).join(' && ') + ')'
  }

  // Parenthesised sub-expression — only strip if the WHOLE cond is wrapped
  if (cond.startsWith('(')) {
    let d = 0, end = -1
    for (let i = 0; i < cond.length; i++) {
      if (cond[i] === '(') d++
      else if (cond[i] === ')') { d--; if (d === 0) { end = i; break } }
    }
    if (end === cond.length - 1 && end > 0) {
      return convertCond(cond.slice(1, -1), inRange, depth+1)
    }
    // Unbalanced / partial parens — function call like (len .X): treat as truthy string
    return `true /* ${cond.slice(0, 40)} */`
  }

  // Plain field or literal
  return convertVal(cond, inRange)
}

function convertVal(v, inRange) {
  v = v.trim()
  if (v.startsWith('"') || v.startsWith("'")) return v
  if (/^\d/.test(v))                           return v
  if (v === 'true' || v === 'false')           return v
  if (v === 'nil' || v === 'null')             return 'null'
  if (v === 'ctx')                             return 'ctx'  // Go template context object
  if (/^\.[A-Za-z_]/.test(v) || /^\$\./.test(v)) return convertField(v, inRange)
  // Local variable with path or method call: $varName.Path.etcOrMethod args
  if (/^\$[A-Za-z_]\w*\./.test(v)) {
    const dot  = v.indexOf('.')
    const base = lcFirst(v.slice(1, dot))
    const rest = v.slice(dot + 1)
    // Re-use convertField by treating the var as a top-level field
    return convertField('.' + base + '.' + rest, inRange)
  }
  // Local variable (just $varName) → props.varName (it's a template-local var, treat as prop)
  if (/^\$[A-Za-z_]\w*$/.test(v)) return `props.${lcFirst(v.slice(1))}`
  // Do NOT call convertCond here — that causes infinite recursion for partial-paren inputs
  // If the value contains spaces, it's a complex expression/function call we can't convert;
  // emit a safe TODO rather than a broken string literal.
  if (v.includes(' ')) return `(true /* TODO: ${v.replace(/\*\//g, '* /').slice(0, 60)} */)`
  return `"${v}"`  // unknown literal → stringify
}

// Parse space-separated args respecting parenthesised groups
function parseArgs(str) {
  const args = []
  let cur = '', depth = 0
  for (const ch of str) {
    if (ch === '(')                           { depth++; cur += ch }
    else if (ch === ')')                      { depth--; cur += ch }
    else if (ch === ' ' && depth === 0)       { if (cur) { args.push(cur); cur = '' } }
    else                                      { cur += ch }
  }
  if (cur) args.push(cur)
  return args
}

// ── Post-process: fix attribute names containing dots ─────────────────────────
// JSX doesn't allow dots in attribute names.
// data-x.y={expr}   →  {...{"data-x.y": expr}}
// data-x.y="val"    →  {...{"data-x.y": "val"}}
function fixDottedAttrNames(body) {
  // Match attr-name-with.dot= where the name starts with a letter/digit
  const ATTR_RE = /\b([\w][\w-]*\.[\w.-]+)=/g
  let result = '', i = 0, match
  ATTR_RE.lastIndex = 0
  while ((match = ATTR_RE.exec(body)) !== null) {
    result += body.slice(i, match.index)
    const attr     = match[1]
    const valStart = match.index + match[0].length
    let spread
    if (body[valStart] === '"') {
      // Static quoted string
      const endQ = body.indexOf('"', valStart + 1)
      if (endQ === -1) { result += match[0]; i = match.index + match[0].length; continue }
      spread = `{...{"${attr}": ${body.slice(valStart, endQ + 1)}}}`
      i = endQ + 1
    } else if (body[valStart] === '{') {
      // JSX expression — scan to matching }
      let depth = 0, j = valStart
      while (j < body.length) {
        if (body[j] === '{')      depth++
        else if (body[j] === '}') { depth--; if (depth === 0) break }
        j++
      }
      const jsExpr = body.slice(valStart + 1, j)
      spread = `{...{"${attr}": ${jsExpr}}}`
      i = j + 1
    } else {
      // Unexpected: keep as-is
      result += match[0]; i = match.index + match[0].length; continue
    }
    result += spread
    ATTR_RE.lastIndex = i
  }
  result += body.slice(i)
  return result
}

// ── Post-process: expression-aware void-element self-closing ─────────────────
// The naive `<tag ... >` → `<tag ... />` regex breaks when `>` appears inside
// JSX attribute expressions like `{...(x >= 2 ? {...} : {})}`. This function
// walks the string and only treats a `>` as the end of the tag when it is not
// inside a `{...}` expression block.
function selfCloseVoidTag(body, tag) {
  const tagRe = new RegExp(`<${tag}(?=[\\s/>])`, 'gi')
  let result = '', lastIdx = 0, match
  tagRe.lastIndex = 0
  while ((match = tagRe.exec(body)) !== null) {
    const tagStart = match.index
    result += body.slice(lastIdx, tagStart)
    // Walk forward from end of tag-name to find the real `>` end of the element
    let i = tagStart + match[0].length
    let depth = 0
    let endIdx = -1
    while (i < body.length) {
      const c = body[i]
      if (c === '{') { depth++; i++; continue }
      if (c === '}') { depth--; i++; continue }
      if (depth === 0 && c === '>') { endIdx = i; break }
      i++
    }
    if (endIdx === -1) {
      // Couldn't find end — emit as-is
      result += body.slice(tagStart, i)
      lastIdx = i
      tagRe.lastIndex = lastIdx
      continue
    }
    const alreadySelfClosed = body[endIdx - 1] === '/'
    if (alreadySelfClosed) {
      result += body.slice(tagStart, endIdx + 1)
    } else {
      result += body.slice(tagStart, endIdx) + ' />'
    }
    lastIdx = endIdx + 1
    tagRe.lastIndex = lastIdx
  }
  result += body.slice(lastIdx)
  return result
}

// ── Post-process: strip {/* ... */} inside JSX opening tags ──────────────────
// TypeScript's JSX parser only allows `{...spread}` inside element opening
// tags, not JSX comments. Strip single-line JSX comment expressions that appear
// between the start `<tagName` and the matching closing `>` of the open tag.
function stripInlineJsxComments(body) {
  // Matches a JSX comment (may be inline or multi-line within a tag).
  const COMMENT_RE = /\s*\{\/\*[\s\S]*?\*\/\}/g
  let result = ''
  let i = 0
  // Simple scan: detect `<identifier` to start an open-tag region
  const OPEN_TAG_RE = /<([A-Za-z][A-Za-z0-9.-]*)(?=[\s/>])/g
  OPEN_TAG_RE.lastIndex = 0
  let match
  while ((match = OPEN_TAG_RE.exec(body)) !== null) {
    result += body.slice(i, match.index)
    const tagBodyStart = match.index
    // Find end of open tag (expression-aware)
    let j = tagBodyStart + match[0].length
    let depth = 0
    let endIdx = -1
    while (j < body.length) {
      const c = body[j]
      if (c === '{') { depth++; j++; continue }
      if (c === '}') { depth--; j++; continue }
      if (depth === 0 && c === '>') { endIdx = j; break }
      j++
    }
    if (endIdx === -1) {
      result += body.slice(tagBodyStart, j)
      i = j
      OPEN_TAG_RE.lastIndex = i
      continue
    }
    // Extract the open tag and strip any inline JSX comments from it
    const openTag = body.slice(tagBodyStart, endIdx + 1)
    result += openTag.replace(COMMENT_RE, '')
    i = endIdx + 1
    OPEN_TAG_RE.lastIndex = i
  }
  result += body.slice(i)
  return result
}

// ── Post-process: escape bare { } in JSX text-content positions ──────────────
// A literal `{` in JSX text content (between `>` and `<`) starts a JS
// expression. Escape them so that raw text like JSON examples in <code> blocks
// is treated as literal characters.
//
// Our translator only emits intentional `{` in text positions whose content
// starts with one of these characters (from processAction):
//   '/' → {/* comment */}
//   '(' → {(cond) ? ...}, {((items) as any[])...map(...)}
//   'p' → {props.field as any}
//   'i' → {item as any} / {item.field as any}
//   't' → {true}
//   'f' → {false}
//   '.' → {...spread} (rare)
// Any `{` followed by anything else in text content is a raw HTML brace and
// must be escaped.
function escapeBareBracesInContent(body) {
  // Characters that start an intentional JSX expression emitted by processAction
  const SAFE_AFTER_BRACE = new Set(['/', '(', 'p', 'i', 't', 'f', '.'])

  let result = ''
  let i = 0
  let inOpenTag = false  // true while inside `<tagname ... >` (attribute zone)
  let exprDepth = 0      // nesting depth inside JSX {…} expressions

  while (i < body.length) {
    const c = body[i]

    if (inOpenTag) {
      // Attribute zone — pass through; track { } depth to find the closing >
      if (c === '{') { exprDepth++; result += c; i++; continue }
      if (c === '}') { if (exprDepth > 0) exprDepth--; result += c; i++; continue }
      if (exprDepth === 0 && c === '>') { inOpenTag = false; result += c; i++; continue }
      result += c; i++; continue
    }

    // Content / text zone
    if (exprDepth > 0) {
      // Inside an intentional JSX expression — pass everything through
      if (c === '{') { exprDepth++; result += c; i++; continue }
      if (c === '}') { exprDepth--; result += c; i++; continue }
      result += c; i++; continue
    }

    // Outermost text content
    if (c === '<') {
      const next = body[i + 1]
      // Only enter attribute zone for opening tags (not </ or <> or <!)
      if (next !== '/' && next !== '>' && next !== '!') inOpenTag = true
      result += c; i++; continue
    }

    if (c === '{') {
      const next = body[i + 1] ?? ''
      if (SAFE_AFTER_BRACE.has(next)) {
        // Intentional JSX expression — let it through and track depth
        exprDepth++; result += c; i++; continue
      }
      // Raw text brace — escape it
      result += "{'{'}"
      i++; continue
    }

    if (c === '}' && exprDepth === 0) {
      // Unmatched closing brace in text content — escape it
      result += "{'}'}"; i++; continue
    }

    result += c; i++
  }
  return result
}

function fixConditionalAttrs(body) {
  const ONE_BRANCH_PATTERNS = [
    { open: ' ? (<>', close: '</>) : null}' },
    { open: ' && (<>', close: '</>) }'     },
  ]
  // Two-branch ternary: {(cond) ? (<>thenAttrs</>) : (<>elseAttrs</>)}
  const TWO_BRANCH_OPEN  = ' ? (<>'
  const TWO_BRANCH_MID   = '</>) : (<>'
  const TWO_BRANCH_CLOSE = '</>)}'

  let result = '', i = 0
  while (i < body.length) {
    const idx = body.indexOf('{(', i)
    if (idx === -1) { result += body.slice(i); break }
    result += body.slice(i, idx)

    // Find matching ) for the outer ( of the condition expression
    let depth = 0, j = idx + 1
    while (j < body.length) {
      if (body[j] === '(') depth++
      else if (body[j] === ')') { depth--; if (depth === 0) break }
      j++
    }

    // --- Try two-branch ternary first (so it takes precedence over one-branch) ---
    if (body.slice(j + 1, j + 1 + TWO_BRANCH_OPEN.length) === TWO_BRANCH_OPEN) {
      const thenEnd = body.indexOf(TWO_BRANCH_MID, j + 1 + TWO_BRANCH_OPEN.length)
      if (thenEnd !== -1) {
        const elseEnd = body.indexOf(TWO_BRANCH_CLOSE, thenEnd + TWO_BRANCH_MID.length)
        if (elseEnd !== -1) {
          const thenContent = body.slice(j + 1 + TWO_BRANCH_OPEN.length, thenEnd).trim()
          const elseContent = body.slice(thenEnd + TWO_BRANCH_MID.length, elseEnd).trim()
          const thenAttrs = parseHtmlAttrs(thenContent)
          const elseAttrs = parseHtmlAttrs(elseContent)
          if (thenAttrs && elseAttrs) {
            const cond = body.slice(idx + 2, j)
            result += conditionalAttrSpread2(cond, thenAttrs, elseAttrs)
            i = elseEnd + TWO_BRANCH_CLOSE.length
            continue
          }
        }
      }
    }

    // --- Try one-branch patterns ---
    const pat = ONE_BRANCH_PATTERNS.find(
      p => body.slice(j + 1, j + 1 + p.open.length) === p.open
    )
    if (!pat) { result += body[idx]; i = idx + 1; continue }

    const cond    = body.slice(idx + 2, j)
    const fragEnd = findMatchingFragClose(body, j + 1, pat.open, pat.close)
    if (fragEnd === -1) { result += body[idx]; i = idx + 1; continue }

    const content = body.slice(j + 1 + pat.open.length, fragEnd).trim()
    const attrs   = parseHtmlAttrs(content)

    if (attrs) {
      result += conditionalAttrSpread(cond, attrs)
      i = fragEnd + pat.close.length
    } else {
      // Content position — emit '{' and continue scanning so nested attr patterns are converted
      result += body[idx]
      i = idx + 1
    }
  }
  return result
}

// Find the closing FRAG_CLOSE that matches the FRAG_OPEN at position `start`.
// Counts nesting: each FRAG_OPEN encountered increments depth, each FRAG_CLOSE decrements.
function findMatchingFragClose(body, start, FRAG_OPEN, FRAG_CLOSE) {
  let depth = 1
  let i     = start + FRAG_OPEN.length
  while (i < body.length && depth > 0) {
    const openIdx  = body.indexOf(FRAG_OPEN,  i)
    const closeIdx = body.indexOf(FRAG_CLOSE, i)
    if (closeIdx === -1) return -1
    if (openIdx !== -1 && openIdx < closeIdx) {
      depth++
      i = openIdx + FRAG_OPEN.length
    } else {
      depth--
      if (depth === 0) return closeIdx
      i = closeIdx + FRAG_CLOSE.length
    }
  }
  return -1
}

// Parse HTML attribute list from JSX body text.
// Returns [{name, jsVal}] if content is entirely valid HTML attrs, or null otherwise.
// Supports:  boolean "open"  |  string attr="val"  |  JSX expr attr={expr}
// Multi-line attribute lists (separated by \n with optional whitespace) are allowed.
function parseHtmlAttrs(s) {
  if (!s || s.includes('<')) return null
  const attrs = []
  let i = 0
  while (i < s.length) {
    while (i < s.length && (s[i] === ' ' || s[i] === '\t' || s[i] === '\n' || s[i] === '\r')) i++
    if (i >= s.length) break
    // Skip JSX comments {/* ... */}
    if (s[i] === '{' && s.slice(i, i + 3) === '{/*') {
      const end = s.indexOf('*/}', i + 3)
      if (end === -1) return null
      i = end + 3; continue
    }
    if (!/[a-zA-Z]/.test(s[i])) return null  // unexpected character
    // Read attribute name (allow hyphen and colon for data-* and aria-*)
    let name = ''
    while (i < s.length && /[\w:-]/.test(s[i])) { name += s[i++] }
    if (!name) return null
    // Determine value
    if (i >= s.length || s[i] === ' ' || s[i] === '\t' || s[i] === '\n' || s[i] === '\r') {
      attrs.push({ name, jsVal: 'true' })
    } else if (s[i] === '=') {
      i++  // skip '='
      if (i >= s.length) return null
      if (s[i] === '"') {
        const endQ = s.indexOf('"', i + 1)
        if (endQ === -1) return null
        attrs.push({ name, jsVal: s.slice(i, endQ + 1) })
        i = endQ + 1
      } else if (s[i] === '{') {
        // JSX expression — find matching }
        let depth = 0, j = i
        while (j < s.length) {
          if (s[j] === '{')      depth++
          else if (s[j] === '}') { depth--; if (depth === 0) break }
          j++
        }
        attrs.push({ name, jsVal: s.slice(i + 1, j) })
        i = j + 1
      } else {
        return null  // unexpected value syntax
      }
    } else {
      return null  // unexpected character after attr name
    }
  }
  return attrs.length > 0 ? attrs : null
}

// Builds a JSX spread expression for a set of conditional attributes.
// e.g. cond='props.open', attrs=[{name:"open",jsVal:"true"}]
//      → {...(props.open ? {"open": true} : {})}
function conditionalAttrSpread(cond, attrs) {
  const obj = attrs.map(({ name, jsVal }) => `"${name}": ${jsVal}`).join(', ')
  return `{...(${cond} ? {${obj}} : {})}`
}

// Builds a JSX spread expression for a two-branch ternary conditional attribute.
// e.g. cond, thenAttrs=[{name:"className",jsVal:'"field"'},{...}], elseAttrs=[...]
//      → {...(cond ? {"className": "field", ...} : {"className": "other", ...})}
function conditionalAttrSpread2(cond, thenAttrs, elseAttrs) {
  const thenObj = thenAttrs.map(({ name, jsVal }) => `"${name}": ${jsVal}`).join(', ')
  const elseObj = elseAttrs.map(({ name, jsVal }) => `"${name}": ${jsVal}`).join(', ')
  return `{...(${cond} ? {${thenObj}} : {${elseObj}})}`
}

// Extracts a JS expression from a JSX attribute value token.
// "string"  → "string"     (JS string literal, kept as-is)
// {expr}    → expr         (JSX expression, outer braces stripped)
// `tmpl`    → `tmpl`       (template literal, kept as-is)
function extractJsExpr(raw) {
  if (raw.startsWith('"') && raw.endsWith('"'))   return raw
  if (raw.startsWith('`') && raw.endsWith('`'))   return raw
  if (raw.startsWith('{') && raw.endsWith('}'))   return raw.slice(1, -1)
  return JSON.stringify(raw)
}


function toPascalCase(str) {
  const name = str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, c => c.toUpperCase())
  // Identifiers must not start with a digit
  return /^\d/.test(name) ? `Page${name}` : name
}

function lcFirst(str) {
  return str ? str.charAt(0).toLowerCase() + str.slice(1) : str
}

main()
