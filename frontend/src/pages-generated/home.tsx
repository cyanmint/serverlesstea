import React from 'react'
import { i18n } from '../lib/i18n'

export default function Home(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={`${(props.isSigned) ? `${i18n("dashboard")}` : `${i18n("home_title")}`}`} className="page-content home">
	<div className="tw-mb-8 tw-px-8">
		<div className="center">
			<img className="logo" width="220" height="220" src={`/img/logo.svg`} alt={String(i18n("logo") ?? "")} />
			<div className="hero">
				<h1 className="ui icon header title tw-text-balance">
					{String(props.appName ?? "")}
				</h1>
				<h2 className="tw-text-balance">{i18n("startpage.app_desc")}</h2>
			</div>
		</div>
	</div>
	<div className="ui stackable middle very relaxed page grid">
		<div className="eight wide center column">
			<h1 className="hero ui icon header">
				<span className="svg-icon" aria-label="octicon-flame"></span> {i18n("startpage.install")}
			</h1>
			<p className="large tw-text-balance">
				{i18n("startpage.install_desc")}
			</p>
		</div>
		<div className="eight wide center column">
			<h1 className="hero ui icon header">
				<span className="svg-icon" aria-label="octicon-device-desktop"></span> {i18n("startpage.platform")}
			</h1>
			<p className="large tw-text-balance">
				{i18n("startpage.platform_desc")}
			</p>
		</div>
	</div>
	<div className="ui stackable middle very relaxed page grid">
		<div className="eight wide center column">
			<h1 className="hero ui icon header">
				<span className="svg-icon" aria-label="octicon-rocket"></span> {i18n("startpage.lightweight")}
			</h1>
			<p className="large tw-text-balance">
				{i18n("startpage.lightweight_desc")}
			</p>
		</div>
		<div className="eight wide center column">
			<h1 className="hero ui icon header">
				<span className="svg-icon" aria-label="octicon-code"></span> {i18n("startpage.license")}
			</h1>
			<p className="large tw-text-balance">
				{i18n("startpage.license_desc")}
			</p>
		</div>
	</div>
</div>


  </>)
}
