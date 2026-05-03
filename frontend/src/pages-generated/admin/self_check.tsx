import React from 'react'
import { i18n } from '../../lib/i18n'

export default function SelfCheck(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}

<div className="admin-setting-content">
	<h4 className="ui top attached header">
		{i18n("admin.self_check")}
	</h4>

	{(props.startupProblems) ? (<>
	<div className="ui attached segment self-check-problem">
		<div className="ui warning message">
			<div>{i18n("admin.self_check.startup_warnings")}</div>
			<ul className="tw-w-full">{((props.startupProblems) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><li>{item as any}</li></React.Fragment>))}</ul>
		</div>
	</div>
	</>) : null}

	<div className="ui attached segment tw-hidden self-check-problem" id="self-check-by-frontend"></div>

	{(props.databaseCheckHasProblems) ? (<>
		<div className="ui attached segment self-check-problem">
			{(props.databaseType?.isMySQL) ? (<>
				<div className="tw-p-2">{i18n("admin.self_check.database_fix_mysql")}</div>
			</>) : null} {(props.databaseType?.isMSSQL) ? (<>
				<div className="tw-p-2">{i18n("admin.self_check.database_fix_mssql")}</div>
			</>) : null}
			{(props.databaseCheckCollationMismatch) ? (<>
				<div className="ui red message">{i18n("admin.self_check.database_collation_mismatch")}</div>
			</>) : null}
			{(props.databaseCheckCollationCaseInsensitive) ? (<>
				<div className="ui warning message">{i18n("admin.self_check.database_collation_case_insensitive")}</div>
			</>) : null}
			{(props.databaseCheckInconsistentCollationColumns) ? (<>
				<div className="ui red message">
					<details>
						<summary>{i18n("admin.self_check.database_inconsistent_collation_columns")}</summary>
						<ul className="tw-w-full">
						{((props.databaseCheckInconsistentCollationColumns) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<li>{item as any}</li>
						</React.Fragment>))}
						</ul>
					</details>
				</div>
			</>) : null}
		</div>
	</>) : null}

	{(props.cacheError) ? (<>
		<div className="ui red message">{i18n("admin.config.cache_test_failed")}</div>
	</>) : null}
	{(props.cacheSlow) ? (<>
		<div className="ui warning message">{i18n("admin.config.cache_test_slow")}</div>
	</>) : null}

	{/* only shown when there is no visible "self-check-problem" */}
	<div className="ui attached segment tw-hidden self-check-no-problem">
		{i18n("admin.self_check.no_problem_found")}
	</div>
</div>

{/* template: admin/layout_footer */}

  </>)
}
