import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function StopwatchTimetracker(props: Record<string, unknown>) {
  return (<>
{(props.repository?.isTimetrackerEnabled?.(ctx)) ? (<>
	{((props.canUseTimetracker && !(props.repository?.isArchived))) ? (<>
		<div className="divider"></div>
		<div>
			<div className="flex-text-block">
				<strong className="tw-flex-1">{i18n("repo.issues.tracker")}</strong>
				<button className="btn interact-fg show-modal" data-tooltip-content={String(i18n("repo.issues.time_estimate_set") ?? "")} data-modal="#issue-time-set-estimate-modal">
					<span className="svg-icon" aria-label="octicon-pencil"></span>
				</button>
			</div>
			<div className="ui buttons tw-mt-2 tw-w-full">
			{(props.isStopwatchRunning) ? (<>
				<button className="ui button tw-flex-1 issue-stop-time link-action" data-url={`${String(props.issue?.link ?? "")}/times/stopwatch/stop`}>
					<span className="svg-icon" aria-label="octicon-stopwatch"></span> {i18n("repo.issues.timetracker_timer_stop")}
				</button>
				<button className="ui icon button issue-cancel-time link-action" data-url={`${String(props.issue?.link ?? "")}/times/stopwatch/cancel`} data-tooltip-content={String(i18n("repo.issues.timetracker_timer_discard") ?? "")}>
					<span className="svg-icon" aria-label="octicon-trash"></span>
				</button>
			</>) : (<>
				<button className="ui button tw-flex-1 issue-start-time link-action" data-url={`${String(props.issue?.link ?? "")}/times/stopwatch/start`}>
					<span className="svg-icon" aria-label="octicon-stopwatch"></span> {i18n("repo.issues.timetracker_timer_start")}
				</button>
				<button className="ui icon button issue-add-time show-modal" data-modal="#issue-time-manually-add-modal" data-tooltip-content={String(i18n("repo.issues.timetracker_timer_manually_add") ?? "")}>
					<span className="svg-icon" aria-label="octicon-plus"></span>
				</button>
			</>)}
			</div>

			{((!(props.isStopwatchRunning) && props.hasUserStopwatch)) ? (<>
				<div className="ui warning message">{i18n("repo.issues.tracking_already_started")}</div>
			</>) : null}

			{(props.issue?.timeEstimate) ? (<>
				<div className="tw-my-2">{i18n("repo.issues.time_estimate_display")}</div>
			</>) : null}

			{/* set time estimate modal */}
			<div className="ui mini modal" id="issue-time-set-estimate-modal">
				<div className="header">{i18n("repo.issues.time_estimate_set")}</div>
				<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="ui form form-fetch-action" action={`${String(props.issue?.link ?? "")}/time_estimate`}>
					<div className="content">
						<input name="time_estimate" placeholder="1h 2m" value={String("" ?? "")} />
						<div className="actions">
							<button className="ui cancel button">{i18n("cancel")}</button>
							<button className="ui primary button">{i18n("repo.issues.save")}</button>
						</div>
					</div>
				</form>
			</div>

			{/* manually add time modal */}
			<div className="ui mini modal" id="issue-time-manually-add-modal">
				<div className="header">{i18n("repo.issues.add_time_manually")}</div>
				<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="ui form form-fetch-action" action={`${String(props.issue?.link ?? "")}/times/add`}>
					<div className="content flex-text-block">
						<input placeholder='{i18n("repo.issues.add_time_hours")}' type="number" name="hours" />:
						<input placeholder='{i18n("repo.issues.add_time_minutes")}' type="number" name="minutes" />
					</div>
					<div className="actions">
						<button className="ui cancel button">{i18n("cancel")}</button>
						<button className="ui primary button">{i18n("repo.issues.timetracker_timer_manually_add")}</button>
					</div>
				</form>
			</div>
		</div>
	</>) : null}
	{(props.workingUsers) ? (<>
		<div className="tw-mt-2">
			{i18n("repo.issues.time_spent_from_all_authors")}
		</div>
		<div className="ui list flex-items-block">
			{((props.workingUsers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item tw-gap-3">
					{/* template: shared/user/avatarlink */}
					<div>
						{/* template: shared/user/authorlink */}
						<div className="text">{/* TODO: {{$trackedtime|Sec2Hour}} */}</div>
					</div>
				</div>
			</React.Fragment>))}
		</div>
	</>) : null}
</>) : null}

  </>)
}
