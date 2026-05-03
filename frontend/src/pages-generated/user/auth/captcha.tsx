// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Captcha(props: Record<string, unknown>) {
  return (<>
{(props.enableCaptcha) ? (<>{(props.captchaType === "image") ? (<>
	<div className="inline field tw-text-center">
		{props.captcha?.createHTML as any}
	</div>
	<div className={`required field ${(props.err_Captcha) ? `error` : ""}`}>
		<label htmlFor="captcha">{i18n("captcha")}</label>
		<input id="captcha" name="captcha" value={String(props.captcha ?? "")} autocomplete="off" />
	</div>
</>) : null} {(props.captchaType === "recaptcha") ? (<>
	<div className="inline field tw-text-center required">
		<div id="captcha" data-captcha-type="g-recaptcha" className="g-recaptcha-style" data-sitekey={String(props.recaptchaSitekey ?? "")}></div>
	</div>
	<script nonce={String("" ?? "")} defer src='{props.recaptchaAPIScriptURL as any}'></script>
</>) : null} {(props.captchaType === "hcaptcha") ? (<>
	<div className="inline field tw-text-center required">
		<div id="captcha" data-captcha-type="h-captcha" className="h-captcha-style" data-sitekey={String(props.hcaptchaSitekey ?? "")}></div>
	</div>
	<script nonce={String("" ?? "")} defer src='https://hcaptcha.com/1/api.js'></script>
</>) : null} {(props.captchaType === "mcaptcha") ? (<>
	<div className="inline field tw-text-center">
		<div className="m-captcha-style" id="mcaptcha__widget-container"></div>
		<label id="mcaptcha__token-label" hidden data-mcaptcha_url={`${String(props.mcaptchaURL ?? "")}/widget?sitekey=${String(props.mcaptchaSitekey ?? "")}`}>
			<input id="mcaptcha__token" name="mcaptcha__token" />{/* the id and name are hard-coded in the library, cant't be changed */}
		</label>
		<div id="captcha" data-captcha-type="m-captcha"></div>
	</div>
</>) : null} {(props.captchaType === "cfturnstile") ? (<>
	<div className="inline field tw-text-center">
		<div id="captcha" data-captcha-type="cf-turnstile" data-sitekey={String(props.cfTurnstileSitekey ?? "")}></div>
	</div>
	<script nonce={String("" ?? "")} defer src='https://challenges.cloudflare.com/turnstile/v0/api.js'></script>
</>) : null}</>) : null}

  </>)
}
