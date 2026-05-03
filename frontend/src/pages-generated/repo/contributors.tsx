// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Contributors(props: Record<string, unknown>) {
  return (<>
{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode")) ? (<>
	<div id="repo-contributors-chart"
		data-repo-link={String(props.repoLink ?? "")}
		data-repo-default-branch-name={String(props.repository?.defaultBranch ?? "")}
		data-locale-filter-label={String(i18n("repo.contributors.contribution_type.filter_label") ?? "")}
		data-locale-contribution-type-commits={String(i18n("repo.contributors.contribution_type.commits") ?? "")}
		data-locale-contribution-type-additions={String(i18n("repo.contributors.contribution_type.additions") ?? "")}
		data-locale-contribution-type-deletions={String(i18n("repo.contributors.contribution_type.deletions") ?? "")}
		data-locale-loading-title={String(i18n("graphs.component_loading") ?? "")}
		data-locale-loading-title-failed={String(i18n("graphs.component_loading_failed") ?? "")}
		data-locale-loading-info={String(i18n("graphs.component_loading_info") ?? "")}
		data-locale-component-failed-to-load={String(i18n("graphs.component_failed_to_load") ?? "")}
	>
	</div>
</>) : null}

  </>)
}
