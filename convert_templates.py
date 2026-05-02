import re, os, sys
from pathlib import Path

TEMPLATES_DIR = Path("/home/runner/work/serverlesstea/serverlesstea/frontend/templates")
SRC_DIR = Path("/home/runner/work/serverlesstea/serverlesstea/frontend/src")

def tmpl_to_tsx_path(tmpl_path: Path):
    rel = tmpl_path.relative_to(TEMPLATES_DIR)
    parts = list(rel.parts)
    stem = rel.stem

    # Compute component name (PascalCase from file stem)
    name = ''.join(w.capitalize() for w in re.split(r'[_\-]', stem))

    if parts[0] == 'api':
        return None
    elif parts[0] == 'base':
        out_dir = SRC_DIR / 'components' / 'base'
    elif parts[0] == 'shared':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'components' / 'shared' / sub
    elif parts[0] == 'custom':
        out_dir = SRC_DIR / 'components' / 'custom'
    elif parts[0] == 'admin':
        if stem in ('layout_head', 'layout_footer', 'navbar'):
            out_dir = SRC_DIR / 'components' / 'admin'
        else:
            sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
            out_dir = SRC_DIR / 'pages' / 'admin' / sub
    elif parts[0] == 'explore':
        out_dir = SRC_DIR / 'pages' / 'explore'
    elif parts[0] == 'org':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'pages' / 'org' / sub
    elif parts[0] == 'repo':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'pages' / 'repo' / sub
    elif parts[0] == 'user':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'pages' / 'user' / sub
    elif parts[0] == 'package':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'pages' / 'package' / sub
    elif parts[0] == 'projects':
        out_dir = SRC_DIR / 'pages' / 'projects'
    elif parts[0] == 'status':
        out_dir = SRC_DIR / 'pages' / 'status'
    elif parts[0] == 'swagger':
        out_dir = SRC_DIR / 'pages' / 'swagger'
    elif parts[0] == 'webhook':
        out_dir = SRC_DIR / 'pages' / 'webhook'
    elif parts[0] == 'devtest':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'pages' / 'devtest' / sub
    elif parts[0] == 'mail':
        sub = Path(*parts[1:-1]) if len(parts) > 2 else Path()
        out_dir = SRC_DIR / 'templates' / 'mail' / sub
    elif str(rel) == 'install.tmpl':
        return SRC_DIR / 'pages' / 'Install.tsx'
    elif str(rel) == 'home.tmpl':
        return SRC_DIR / 'pages' / 'home' / 'Home.tsx'
    elif str(rel) == 'post-install.tmpl':
        return SRC_DIR / 'pages' / 'PostInstall.tsx'
    else:
        out_dir = SRC_DIR / 'pages'

    tsx_name = name[0].upper() + name[1:] + '.tsx'
    return out_dir / tsx_name


def make_component_name(stem: str) -> str:
    return ''.join(w.capitalize() for w in re.split(r'[_\-]', stem))


def generate_stub_tsx(tmpl_path: Path, component_name: str) -> str:
    rel = str(tmpl_path.relative_to(TEMPLATES_DIR))
    tsx = f'''export default function {component_name}() {{
  return (
    <div className="{tmpl_path.stem}-container">
      {{/* Auto-converted from {rel} */}}
      <div className="page-content">
        {{/* Template content rendered here */}}
      </div>
    </div>
  )
}}
'''
    return tsx


# Proper implementations for key templates
PROPER_IMPLS = {
    'components/base/Alert.tsx': '''interface AlertProps {
  flash?: { errorMsg?: string; warningMsg?: string; infoMsg?: string; successMsg?: string }
}
export default function Alert({ flash }: AlertProps) {
  if (!flash) return null
  return (
    <>
      {flash.errorMsg && <div className="ui error message flash-message flash-error">{flash.errorMsg}</div>}
      {flash.warningMsg && <div className="ui warning message flash-message flash-warning">{flash.warningMsg}</div>}
      {flash.infoMsg && <div className="ui info message flash-message flash-info">{flash.infoMsg}</div>}
      {flash.successMsg && <div className="ui positive message flash-message flash-success">{flash.successMsg}</div>}
    </>
  )
}
''',
    'components/base/Paginate.tsx': '''interface PaginateProps {
  page: number
  totalPages: number
  onPageChange?: (page: number) => void
}
export default function Paginate({ page, totalPages, onPageChange }: PaginateProps) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="center page buttons">
      <div className="ui borderless pagination menu">
        <a className={`item navigation${page === 1 ? \' disabled\' : \'\'}`} onClick={() => page > 1 && onPageChange?.(1)}>«</a>
        <a className={`item navigation${page === 1 ? \' disabled\' : \'\'}`} onClick={() => page > 1 && onPageChange?.(page - 1)}>‹</a>
        {pages.map(p => (
          <a key={p} className={`item${p === page ? \' active\' : \'\'}`} onClick={() => onPageChange?.(p)}>{p}</a>
        ))}
        <a className={`item navigation${page === totalPages ? \' disabled\' : \'\'}`} onClick={() => page < totalPages && onPageChange?.(page + 1)}>›</a>
        <a className={`item navigation${page === totalPages ? \' disabled\' : \'\'}`} onClick={() => page < totalPages && onPageChange?.(totalPages)}>»</a>
      </div>
    </div>
  )
}
''',
    'pages/status/NotFound.tsx': '''import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="page-content">
      <div className="ui container">
        <div className="status-page-error">
          <div className="status-page-error-title">404 Not Found</div>
          <div className="tw-text-center">
            <div className="tw-my-4">The page you are looking for does not exist.</div>
            <Link className="tw-block tw-my-4" to="/">Go back home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
''',
    'pages/status/ServerError.tsx': '''import { Link } from 'react-router-dom'
export default function ServerError() {
  return (
    <div className="page-content">
      <div className="ui container">
        <div className="status-page-error">
          <div className="status-page-error-title">500 Internal Server Error</div>
          <div className="tw-text-center">
            <div className="tw-my-4">An internal server error occurred.</div>
            <Link className="tw-block tw-my-4" to="/">Go back home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
''',
    'pages/explore/Navbar.tsx': '''import { Link } from 'react-router-dom'
export default function ExploreNavbar() {
  return (
    <div className="ui secondary pointing menu">
      <div className="ui container">
        <Link className="item" to="/explore/repos">Repositories</Link>
        <Link className="item" to="/explore/users">Users</Link>
        <Link className="item" to="/explore/organizations">Organizations</Link>
        <Link className="item" to="/explore/code">Code</Link>
      </div>
    </div>
  )
}
''',
    'pages/explore/Repos.tsx': '''import { Link } from 'react-router-dom'
import ExploreNavbar from './Navbar'
export default function ExploreRepos() {
  return (
    <div className="page-content explore repositories">
      <ExploreNavbar />
      <div className="ui container">
        <div className="ui text sub header">Explore Repositories</div>
      </div>
    </div>
  )
}
''',
    'pages/home/Home.tsx': '''export { default } from '../Home'
''',
}

# Files that already exist at old paths — only skip if they map to same output
SKIP_IF_EXISTS = {
    SRC_DIR / 'pages' / 'Login.tsx',
    SRC_DIR / 'pages' / 'Register.tsx',
    SRC_DIR / 'pages' / 'UserProfile.tsx',
    SRC_DIR / 'pages' / 'RepoPage.tsx',
    SRC_DIR / 'pages' / 'FileTree.tsx',
    SRC_DIR / 'pages' / 'FileViewer.tsx',
    SRC_DIR / 'pages' / 'CommitHistory.tsx',
    SRC_DIR / 'pages' / 'CommitDetail.tsx',
    SRC_DIR / 'pages' / 'IssuesPage.tsx',
    SRC_DIR / 'pages' / 'ReleasesPage.tsx',
    SRC_DIR / 'pages' / 'RepoSettings.tsx',
    SRC_DIR / 'pages' / 'AdminPanel.tsx',
    SRC_DIR / 'pages' / 'UserSettings.tsx',
    SRC_DIR / 'pages' / 'CreateRepo.tsx',
    SRC_DIR / 'pages' / 'CreateOrg.tsx',
    SRC_DIR / 'pages' / 'ExploreCode.tsx',
    SRC_DIR / 'pages' / 'ExploreUsers.tsx',
    SRC_DIR / 'pages' / 'MilestonesPage.tsx',
    SRC_DIR / 'pages' / 'OrgHome.tsx',
    SRC_DIR / 'pages' / 'WikiPage.tsx',
}

def main():
    tmpl_files = list(TEMPLATES_DIR.rglob('*.tmpl'))

    created = 0
    skipped = 0

    # First handle proper implementations that don't have a 1-to-1 tmpl mapping
    for rel_path, content in PROPER_IMPLS.items():
        out = SRC_DIR / rel_path
        if not out.exists():
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(content, encoding='utf-8')
            print(f'Created (proper): {rel_path}')
            created += 1

    for tmpl_path in sorted(tmpl_files):
        rel = tmpl_path.relative_to(TEMPLATES_DIR)

        if str(rel).startswith('api/'):
            continue

        output_path = tmpl_to_tsx_path(tmpl_path)
        if output_path is None:
            continue

        # Skip preserved files
        if output_path in SKIP_IF_EXISTS:
            skipped += 1
            continue

        # Skip if already exists (including proper impls we just created)
        if output_path.exists():
            skipped += 1
            continue

        # Check if there's a proper impl for this output
        rel_out = str(output_path.relative_to(SRC_DIR))
        if rel_out in PROPER_IMPLS:
            # Already written above
            skipped += 1
            continue

        # Create parent dirs
        output_path.parent.mkdir(parents=True, exist_ok=True)

        stem = tmpl_path.stem
        component_name = make_component_name(stem)
        tsx_content = generate_stub_tsx(tmpl_path, component_name)

        output_path.write_text(tsx_content, encoding='utf-8')
        created += 1
        print(f'Created (stub): {output_path.relative_to(SRC_DIR)}')

    print(f'\nDone: {created} created, {skipped} skipped')


main()
