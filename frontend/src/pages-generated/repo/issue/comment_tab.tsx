import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CommentTab(props: Record<string, unknown>) {
  return (<>
{/* $textareaContent */}
{(!(textareaContent)) ? (<>{/* TODO: {{$textareaContent = .IssueTemplate}} */}</>) : null}
{(!(textareaContent)) ? (<>{/* TODO: {{$textareaContent = .PullRequestTemplate}} */}</>) : null}
{(!(textareaContent)) ? (<>{/* TODO: {{$textareaContent = .content}} */}</>) : null}

<div className="field">
	{/* template: shared/combomarkdowneditor */}
</div>

{(props.isAttachmentEnabled) ? (<>
	<div className="field">
		{/* template: repo/upload */}
	</div>
</>) : null}

  </>)
}
