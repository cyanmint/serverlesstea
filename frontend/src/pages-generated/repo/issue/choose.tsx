import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Choose(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new issue">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		<div className="issue-navbar">
			{/* template: repo/issue/navbar */}
		</div>
		<div className="divider"></div>
		{((props.issueTemplates) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="ui attached segment">
				<div className="ui two column grid">
					<div className="column">
						<strong>{item.name as any}</strong>
						<br />{item.about as any}
					</div>
					<div className="column tw-text-right">
						<a href={`${String(props.repoLink ?? "")}/issues/new?template=${String(props.fileName ?? "")}${(props.milestone) ? `&milestone=${String(props.milestone ?? "")}` : ""}${(props.project) ? `&project=${String(props.project ?? "")}` : ""}`} className="ui primary button">{i18n("repo.issues.choose.get_started")}</a>
					</div>
				</div>
			</div>
		</React.Fragment>))}
		{((props.issueConfig?.contactLinks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="ui attached segment">
				<div className="ui two column grid">
					<div className="column">
						<strong>{item.name as any}</strong>
						<br />{item.about as any}
					</div>
					<div className="column tw-text-right">
						<a href={String(props.uRL ?? "")} className="ui primary button"><span className="svg-icon" aria-label="octicon-link-external"></span> {i18n("repo.issues.choose.open_external_link")}</a>
					</div>
				</div>
			</div>
		</React.Fragment>))}
		{(props.issueConfig?.blankIssuesEnabled) ? (<>
			<div className="ui attached segment">
				<div className="ui two column grid">
					<div className="column">
						<strong>{i18n("repo.issues.choose.blank")}</strong>
						<br/>{i18n("repo.issues.choose.blank_about")}
					</div>
					<div className="column tw-text-right">
						<a href={`${String(props.repoLink ?? "")}/issues/new?${(props.milestone) ? `&milestone=${String(props.milestone ?? "")}` : ""}${(props.project) ? `&project=${String(props.project ?? "")}` : ""}`} className="ui primary button">{i18n("repo.issues.choose.get_started")}</a>
					</div>
				</div>
			</div>
		</>) : null}
		{(props.issueConfigError) ? (<>{/* normal warning flash makes problems here */}
			<div className="ui warning message">
				<div className="text left">
					<div>{i18n("repo.issues.choose.invalid_config")}</div>
					<div>{props.issueConfigError as any}</div>
				</div>
			</div>
		</>) : null}
	</div>
</div>


  </>)
}
