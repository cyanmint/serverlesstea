import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function RunnerBadgeFlat(props: Record<string, unknown>) {
  return (<>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width={String(props.badge?.width ?? "")} height="20"
	role="img" aria-label={`${String(props.badge?.label?.text ?? "")}: ${String(props.badge?.message?.text ?? "")}`}>
	<title>{props.badge?.label?.text as any}: {props.badge?.message?.text as any}</title>
	<linearGradient id={`${String(props.badge?.iDPrefix ?? "")}s`} x2="0" y2="100%">
		<stop offset="0" stop-color="#bbb" stop-opacity=".1" />
		<stop offset="1" stop-opacity=".1" />
	</linearGradient>
	<clipPath id={`${String(props.badge?.iDPrefix ?? "")}r`}>
		<rect width={String(props.badge?.width ?? "")} height="20" rx="3" fill="#fff" />
	</clipPath>
	<g clip-path={`url(#${String(props.badge?.iDPrefix ?? "")}r)`}>
		<rect width={String(props.badge?.label?.width ?? "")} height="20" fill="#555" />
		<rect x={String(props.badge?.label?.width ?? "")} width={String(props.badge?.message?.width ?? "")} height="20" fill={String(props.badge?.color ?? "")} />
		<rect width={String(props.badge?.width ?? "")} height="20" fill={`url(#${String(props.badge?.iDPrefix ?? "")}s)`} />
	</g>
	<g fill="#fff" text-anchor="middle" font-family={String(props.badge?.fontFamily ?? "")}
		text-rendering="geometricPrecision" font-size={String(props.badge?.fontSize ?? "")}>
		<text aria-hidden="true" x={String(props.badge?.label?.x ?? "")} y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)"
			textLength={String(props.badge?.label?.textLength ?? "")}>{props.badge?.label?.text as any}</text>
		<text x={String(props.badge?.label?.x ?? "")} y="140"
			transform="scale(.1)" fill="#fff" textLength={String(props.badge?.label?.textLength ?? "")}>{props.badge?.label?.text as any}</text>
		<text aria-hidden="true" x={String(props.badge?.message?.x ?? "")} y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)"
			textLength={String(props.badge?.message?.textLength ?? "")}>{props.badge?.message?.text as any}</text>
		<text x={String(props.badge?.message?.x ?? "")} y="140" transform="scale(.1)" fill="#fff"
			textLength={String(props.badge?.message?.textLength ?? "")}>{props.badge?.message?.text as any}</text>
	</g>
</svg>

  </>)
}
