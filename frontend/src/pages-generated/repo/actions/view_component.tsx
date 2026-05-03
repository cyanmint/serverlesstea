import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ViewComponent(props: Record<string, unknown>) {
  return (<>
	<div id="repo-action-view"
		data-job-id={String(props.jobID ?? "")}
		data-actions-view-url={String(props.actionsViewURL ?? "")}

		data-locale-approve={String(i18n("repo.diff.review.approve") ?? "")}
		data-locale-cancel={String(i18n("actions.runs.cancel") ?? "")}
		data-locale-rerun={String(i18n("rerun") ?? "")}
		data-locale-rerun-all={String(i18n("rerun_all") ?? "")}
		data-locale-rerun-failed={String(i18n("rerun_failed") ?? "")}
		data-locale-latest={String(i18n("actions.runs.latest") ?? "")}
		data-locale-latest-attempt={String(i18n("actions.runs.latest_attempt") ?? "")}
		data-locale-attempt={String(i18n("actions.runs.attempt") ?? "")}
		data-locale-runs-scheduled={String(i18n("actions.runs.scheduled") ?? "")}
		data-locale-runs-commit={String(i18n("actions.runs.commit") ?? "")}
		data-locale-runs-pushed-by={String(i18n("actions.runs.pushed_by") ?? "")}
		data-locale-summary={String(i18n("actions.runs.summary") ?? "")}
		data-locale-all-jobs={String(i18n("actions.runs.all_jobs") ?? "")}
		data-locale-triggered-via={String(i18n("actions.runs.triggered_via") ?? "")}
		data-locale-total-duration={String(i18n("actions.runs.total_duration") ?? "")}
		data-locale-run-details={String(i18n("actions.runs.run_details") ?? "")}
		data-locale-workflow-file={String(i18n("actions.runs.workflow_file") ?? "")}
		data-locale-status-unknown={String(i18n("actions.status.unknown") ?? "")}
		data-locale-status-waiting={String(i18n("actions.status.waiting") ?? "")}
		data-locale-status-running={String(i18n("actions.status.running") ?? "")}
		data-locale-status-success={String(i18n("actions.status.success") ?? "")}
		data-locale-status-failure={String(i18n("actions.status.failure") ?? "")}
		data-locale-status-cancelled={String(i18n("actions.status.cancelled") ?? "")}
		data-locale-status-skipped={String(i18n("actions.status.skipped") ?? "")}
		data-locale-status-blocked={String(i18n("actions.status.blocked") ?? "")}
		data-locale-artifacts-title={String(i18n("artifacts") ?? "")}
		data-locale-artifact-expired={String(i18n("expired") ?? "")}
		data-locale-artifact-expires-at={String(i18n("artifact_expires_at") ?? "")}
		data-locale-confirm-delete-artifact={String(i18n("confirm_delete_artifact") ?? "")}
		data-locale-show-timestamps={String(i18n("show_timestamps") ?? "")}
		data-locale-show-log-seconds={String(i18n("show_log_seconds") ?? "")}
		data-locale-show-full-screen={String(i18n("show_full_screen") ?? "")}
		data-locale-download-logs={String(i18n("download_logs") ?? "")}
		data-locale-logs-always-auto-scroll={String(i18n("actions.logs.always_auto_scroll") ?? "")}
		data-locale-logs-always-expand-running={String(i18n("actions.logs.always_expand_running") ?? "")}
>
</div>

  </>)
}
