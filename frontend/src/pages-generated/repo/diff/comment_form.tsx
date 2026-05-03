import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CommentForm(props: Record<string, unknown>) {
  return (<>
{(("ctx.RootData.SignedUserID" && !("ctx.RootData.Repository.IsArchived"))) ? (<>
	<form className={`ui form ${(props.hidden) ? `tw-hidden comment-form` : ""}`} action={`${String(props.root?.issue?.link ?? "")}/files/reviews/comments`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<input type="hidden" name="origin" value={`${(props.root?.pageIsPullFiles) ? `diff` : `timeline`}`} />
		<input type="hidden" name="latest_commit_id" value={String(props.root?.afterCommitID ?? "")} />
		<input type="hidden" name="side" value={`${(props.side) ? `${String(props.side ?? "")}` : ""}`} />
		<input type="hidden" name="line" value={`${(props.line) ? `${String(props.line ?? "")}` : ""}`} />
		<input type="hidden" name="path" value={`${(props.file) ? `${String(props.file ?? "")}` : ""}`} />
		<input type="hidden" name="diff_start_cid" />
		<input type="hidden" name="diff_end_cid" />
		<input type="hidden" name="diff_base_cid" />
		<div className="field">
		{/* template: shared/combomarkdowneditor */}
		</div>
		{(props.root?.isAttachmentEnabled) ? (<>
			<div className="field">
				{/* template: repo/upload */}
			</div>
		</>) : null}

		<div className="field footer">
			<div className="flex-text-block tw-justify-end">
				{(props.reply) ? (<>
					<button className="ui submit primary tiny button btn-reply" type="submit">{i18n("repo.diff.comment.reply")}</button>
					<input type="hidden" name="reply" value={String(props.reply ?? "")} />
					<input type="hidden" name="single_review" value="true" />
				</>) : (<>
					{(props.root?.currentReview) ? (<>
						<button name="pending_review" type="submit" className="ui submit primary tiny button btn-add-comment">{i18n("repo.diff.comment.add_review_comment")}</button>
					</>) : (<>
						<button name="pending_review" type="submit" className="ui submit primary tiny button btn-start-review">{i18n("repo.diff.comment.start_review")}</button>
						<button name="single_review" value="true" type="submit" className="ui submit tiny basic button btn-add-single">{i18n("repo.diff.comment.add_single_comment")}</button>
					</>)}
				</>)}
				{((!(props.hasComments) || props.hidden)) ? (<>
					<button type="button" className="ui submit tiny basic button btn-cancel cancel-code-comment">{i18n("cancel")}</button>
				</>) : null}
			</div>
		</div>
	</form>
</>) : null}

  </>)
}
