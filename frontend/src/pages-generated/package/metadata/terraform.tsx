// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Terraform(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "terraform") ? (<>
	{/* $data */}
	{(props.data?.isLatestVersion) ? (<>
		<div className="divider"></div>
		<div className="item tw-flex tw-flex-col tw-gap-2">
			<div>
				<strong>{i18n("packages.terraform.lock_status")}</strong>
			</div>
			<div>
				{(props.data?.terraformLock) ? (<>
					<div className="flex-text-block">
						<span className="svg-icon" aria-label="octicon-lock"></span>
						<span>{i18n("packages.terraform.locked_by")}</span>
					</div>
					<div className="tw-text-xs tw-ml-6 tw-break-anywhere">
						{/* TODO: {{DateUtils.TimeSince $data.TerraformLock.Created}} */} ({/* TODO: {{$data.TerraformLock.Operation}} */})
					</div>
					{(props.canWritePackages) ? (<>
						<div>
							<form action={`${String(props.packageDescriptor?.versionWebLink ?? "")}/terraform/unlock`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
								<button className="ui tiny button tw-w-full">{i18n("packages.terraform.unlock")}</button>
							</form>
						</div>
					</>) : null}
				</>) : (<>
					<div className="flex-text-block">
						<span className="svg-icon" aria-label="octicon-unlock"></span>
						<span>{i18n("packages.terraform.unlocked")}</span>
					</div>
					{(props.canWritePackages) ? (<>
						<div>
							<form action={`${String(props.packageDescriptor?.versionWebLink ?? "")}/terraform/lock`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
								<button className="ui tiny button tw-w-full">{i18n("packages.terraform.lock")}</button>
							</form>
						</div>
					</>) : null}
				</>)}
			</div>
		</div>
	</>) : null}
</>) : null}

  </>)
}
