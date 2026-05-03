import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function CommentsDeleteTime(props: Record<string, unknown>) {
  return (<>
{((props.comment?.time && props.ctxData?.repository?.isTimetrackerEnabled ctx)) ? (<> {/* compatibility with time comments made before v1.14 */}
	{(!(props.comment?.time?.deleted)) ? (<>
		{((props.ctxData?.isAdmin || (props.ctxData?.isSigned && props.ctxData?.signedUserID === props.comment?.posterID))) ? (<>
			<span className="tw-ml-auto">
				<button className="ui icon button compact mini link-action" data-tooltip-content={String(i18n("repo.issues.del_time") ?? "")}
								data-url={`${String(props.ctxData?.repoLink ?? "")}/issues/${String(props.ctxData?.issue?.index ?? "")}/times/${String(props.comment?.timeID ?? "")}/delete?id=${String(props.comment?.time?.iD ?? "")}`}
								data-modal-confirm={String(i18n("repo.issues.del_time") ?? "")}
				>
					<span className="svg-icon" aria-label="octicon-trash"></span>
				</button>
			</span>
		</>) : null}
	</>) : null}
</>) : null}

  </>)
}
