import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HeadOpengraph(props: Record<string, unknown>) {
  return (<>
{/* TODO: {{- /* og:description - a one to two sentence description of your object, maybe it only needs at most 300 bytes * / -}} */}
{(props.pageIsUserProfile) ? (<>
	<meta property="og:title" content={String(props.contextUser?.displayName ?? "")} />
	<meta property="og:type" content="profile" />
	<meta property="og:image" content={String(props.contextUser?.avatarLink ctx ?? "")} />
	<meta property="og:url" content={String(props.contextUser?.hTMLURL ctx ?? "")} />
	{(props.contextUser?.description) ? (<>
		<meta property="og:description" content={String("" ?? "")} />
	</>) : null}
</>) : null} {(props.repository) ? (<>
	{(props.issue) ? (<>
		<meta property="og:title" content={String(props.issue?.title ?? "")} />
		<meta property="og:url" content={String(props.issue?.hTMLURL ctx ?? "")} />
		{(props.issue?.content) ? (<>
			<meta property="og:description" content={String("" ?? "")} />
		</>) : null}
	</>) : null} {((props.pageIsDiff || props.isViewFile)) ? (<>
		<meta property="og:title" content={String(props.title ?? "")} />
		<meta property="og:url" content={String("" ?? "")} />
		{((props.pageIsDiff && props.commit)) ? (<>
			{/* TODO: {{- $commitMessageParts := StringUtils.Cut .Commit.Message "\n" -}} */}
			{/* TODO: {{- $commitMessageBody := index $commitMessageParts 1 -}} */}
			{/* TODO: {{- if $commitMessageBody -}} */}
				<meta property="og:description" content={String("" ?? "")} />
			{/* TODO: {{- end -}} */}
		</>) : null}
	</>) : (<>
		<meta property="og:title" content={String(props.repository?.name ?? "")} />
		<meta property="og:url" content={String(props.repository?.hTMLURL ctx ?? "")} />
		{(props.repository?.description) ? (<>
			<meta property="og:description" content={String("" ?? "")} />
		</>) : null}
	</>)}
	<meta property="og:type" content="object" />
	{(props.repository?.avatarLink ctx) ? (<>
		<meta property="og:image" content={String(props.repository?.avatarLink ctx ?? "")} />
	</>) : (<>
		<meta property="og:image" content={String(props.repository?.owner?.avatarLink ctx ?? "")} />
	</>)}
</>) : (<>
	<meta property="og:title" content={String("" ?? "")} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={`/img/logo.png`} />
	<meta property="og:url" content={String("" ?? "")} />
	<meta property="og:description" content={String("" ?? "")} />
</>)}
<meta property="og:site_name" content={String("" ?? "")} />

  </>)
}
