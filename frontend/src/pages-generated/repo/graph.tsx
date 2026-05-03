import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Graph(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository commits">
	{/* template: repo/header */}
	<div className="ui container">
		<div id="git-graph-container" className={`ui segment ${(props.mode === "monochrome") ? `monochrome` : ""}`}>
			<h2 className="ui header dividing">
				{i18n("repo.commit_graph")}
				<div className="ui icon buttons tiny color-buttons">
					<div className="ui multiple selection search dropdown" id="flow-select-refs-dropdown">
						<input type="hidden" name="flow" />
						<div className="default text">{i18n("repo.commit_graph.select")}</div>
						<div className="menu">
							<div className="item" data-value="...flow-hide-pr-refs">
								<span className="svg-icon" aria-label="octicon-eye-closed"></span>
								<span className="gt-ellipsis" title={String(i18n("repo.commit_graph.hide_pr_refs") ?? "")}>{i18n("repo.commit_graph.hide_pr_refs")}</span>
							</div>
							{((props.allRefs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{/* $refGroup */}
								{(refGroup === "pull") ? (<>
									<div className="item" data-value={String(props.name ?? "")}>
										<span className="svg-icon" aria-label="octicon-git-pull-request"></span>
										<span className="gt-ellipsis" title={String(props.shortName ?? "")}>#{item.shortName as any}</span>
									</div>
								</>) : null} {(refGroup === "tags") ? (<>
									<div className="item" data-value={String(props.name ?? "")}>
										<span className="svg-icon" aria-label="octicon-tag"></span>
										<span className="gt-ellipsis" title={String(props.shortName ?? "")}>{item.shortName as any}</span>
									</div>
								</>) : null} {(refGroup === "remotes") ? (<>
									<div className="item" data-value={String(props.name ?? "")}>
										<span className="svg-icon" aria-label="octicon-cross-reference"></span>
										<span className="gt-ellipsis" title={String(props.shortName ?? "")}>{item.shortName as any}</span>
									</div>
								</>) : null} {(refGroup === "heads") ? (<>
									<div className="item" data-value={String(props.name ?? "")}>
										<span className="svg-icon" aria-label="octicon-git-branch"></span>
										<span className="gt-ellipsis" title={String(props.shortName ?? "")}>{item.shortName as any}</span>
									</div>
								</>) : null}
							</React.Fragment>))}
						</div>
					</div>
					<button id="flow-color-monochrome" className={`ui icon button${(props.mode === "monochrome") ? ` active` : ""}`} title={String(i18n("repo.commit_graph.monochrome") ?? "")}><span className="svg-icon" aria-label="material-invert-colors"></span>{i18n("repo.commit_graph.monochrome")}</button>
					<button id="flow-color-colored" className={`ui icon button${(props.mode !== "monochrome") ? ` active` : ""}`} title={String(i18n("repo.commit_graph.color") ?? "")}><span className="svg-icon" aria-label="material-palette"></span>{i18n("repo.commit_graph.color")}</button>
				</div>
			</h2>
			<div id="git-graph-body">
				{/* template: repo/graph/svgcontainer */}
				{/* template: repo/graph/commits */}
				{/* template: base/paginate */}
			</div>
		</div>
	</div>
</div>


  </>)
}
