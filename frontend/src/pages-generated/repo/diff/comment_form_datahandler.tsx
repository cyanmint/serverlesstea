import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CommentFormDatahandler(props: Record<string, unknown>) {
  return (<>
{(props.comment) ? (<>
	{/* template: repo/diff/comment_form */}
</>) : null} {(props.root) ? (<>
	{/* template: repo/diff/comment_form */}
</>) : (<>
	{/* template: repo/diff/comment_form */}
</>)}

  </>)
}
