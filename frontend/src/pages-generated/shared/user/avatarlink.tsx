import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Avatarlink(props: Record<string, unknown>) {
  return (<>
<a className="avatar-with-link" {...(props.tooltip ? {"data-tooltip-content": `${String(props.user?.name ?? "")}${(props.user?.fullName) ? ` (${String(props.user?.fullName ?? "")})` : ""}`} : {})} {...(props.user?.iD > 0 ? {"href": String(props.user?.homeLink ?? "")} : {})}>{/* TODO: {{ctx.AvatarUtils.Avatar .user (or .size 20)}} */}</a>

  </>)
}
