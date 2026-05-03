import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Packagist(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "packagist") ? (<>
	<p>{i18n("repo.settings.add_web_hook_desc")}</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/packagist/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_Username) ? `error` : ""}`}>
			<label htmlFor="username">{i18n("repo.settings.packagist_username")}</label>
			<input id="username" name="username" value={String(props.packagistHook?.username ?? "")} placeholder="Gitea" autofocus required />
		</div>
		<div className={`required field ${(props.err_APIToken) ? `error` : ""}`}>
			<label htmlFor="api_token">{i18n("repo.settings.packagist_api_token")}</label>
			<input id="api_token" name="api_token" value={String(props.packagistHook?.aPIToken ?? "")} placeholder="X5F_tZ-Wj3c1vqaU2Rky" required />
		</div>
		<div className={`required field ${(props.err_PackageURL) ? `error` : ""}`}>
			<label htmlFor="package_url">{i18n("repo.settings.packagist_package_url")}</label>
			<input id="package_url" name="package_url" value={String(props.packagistHook?.packageURL ?? "")} placeholder="https://packagist.org/packages/laravel/framework" required />
		</div>
		{/* FIXME: support authorization header or not? */}
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
