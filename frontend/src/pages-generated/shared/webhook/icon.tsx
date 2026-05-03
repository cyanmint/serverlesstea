// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Icon(props: Record<string, unknown>) {
  return (<>
{/* $size */}
{(props.size) ? (<>
	{/* TODO: {{$size = .Size}} */}
</>) : null}
{(props.hookType === "gitea") ? (<>
	<span className="svg-icon" aria-label="gitea-gitea"></span>
</>) : null} {(props.hookType === "gogs") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/gogs.png`} />
</>) : null} {(props.hookType === "slack") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/slack.png`} />
</>) : null} {(props.hookType === "discord") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/discord.png`} />
</>) : null} {(props.hookType === "dingtalk") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/dingtalk.ico`} />
</>) : null} {(props.hookType === "telegram") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/telegram.png`} />
</>) : null} {(props.hookType === "msteams") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/msteams.png`} />
</>) : null} {(props.hookType === "feishu") ? (<>
	<span className="svg-icon" aria-label="gitea-feishu"></span>
</>) : null} {(props.hookType === "matrix") ? (<>
	<span className="svg-icon" aria-label="gitea-matrix"></span>
</>) : null} {(props.hookType === "wechatwork") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/wechatwork.png`} />
</>) : null} {(props.hookType === "packagist") ? (<>
	<img alt width={String("" ?? "")} height={String("" ?? "")} src={`/img/packagist.png`} />
</>) : null}

  </>)
}
