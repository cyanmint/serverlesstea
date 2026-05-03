// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function StacktraceRow(props: Record<string, unknown>) {
  return (<>
<div className="item">
	<div className="tw-flex tw-items-center">
		<div className="icon tw-ml-2 tw-mr-2">
			{(props.process?.type === "request") ? (<>
				<span className="svg-icon" aria-label="octicon-globe"></span>
			</>) : null} {(props.process?.type === "system") ? (<>
				<span className="svg-icon" aria-label="octicon-cpu"></span>
			</>) : null} {(props.process?.type === "normal") ? (<>
				<span className="svg-icon" aria-label="octicon-terminal"></span>
			</>) : (<>
				<span className="svg-icon" aria-label="octicon-code"></span>
			</>)}
		</div>
		<div className="content tw-flex-1">
			<div className="header">{props.process?.description as any}</div>
			<div className="description">{(props.process?.type !== "none") ? (<>{/* TODO: {{DateUtils.TimeSince .Process.Start}} */}</>) : null}</div>
		</div>
		<div>
			{((props.process?.type === "request" || props.process?.type === "normal")) ? (<>
				<a className="link-action" data-url={`${String(props.root?.link ?? "")}/cancel/${String(props.process?.pID ?? "")}`}
					data-modal-confirm-header={String(i18n("admin.monitor.process.cancel") ?? "")}
					data-modal-confirm-content={String(i18n("admin.monitor.process.cancel_desc") ?? "")}
				><span className="svg-icon" aria-label="octicon-trash"></span></a>
			</>) : null}
		</div>
	</div>
	{(props.process?.stacks) ? (<>
		<div className="divided list tw-ml-2">
			{((props.process?.stacks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item">
					<details>
						<summary>
							<div className="flex-text-inline">
								<div className="header tw-ml-2">
									<span className="icon tw-mr-2"><span className="svg-icon" aria-label="octicon-code"></span></span>{item.description as any}{(item.count > 1) ? (<> * {item.count as any}</>) : null}
								</div>
								<div className="description">
									{((item.labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
										<div className="ui label">{item.name as any}<div className="detail">{item.value as any}</div></div>
									</React.Fragment>))}
								</div>
							</div>
						</summary>
						<div className="list">
							{((item.entry) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item tw-flex tw-items-center">
									<span className="icon tw-mr-4"><span className="svg-icon" aria-label="octicon-dot-fill"></span></span>
									<div className="content tw-flex-1">
										<div className="header">{item.function as any}</div>
										<div className="description">{item.file as any}:{item.line as any}</div>
									</div>
								</div>
							</React.Fragment>))}
						</div>
					</details>
				</div>
			</React.Fragment>))}
		</div>
	</>) : null}

	{(props.process?.children) ? (<>
		<div className="divided list">
			{((props.process?.children) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* template: admin/stacktrace-row */}
			</React.Fragment>))}
		</div>
	</>) : null}

</div>

  </>)
}
