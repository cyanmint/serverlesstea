// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ModalActionsConfirm(props: Record<string, unknown>) {
  return (<>
{/* Two buttons (negative, positive):
* ModalButtonTypes: "yes" (default) or "confirm"
* ModalButtonCancelText
* ModalButtonOkText

Single danger button (GitHub-like):
* ModalButtonDangerText "This action will destroy your data"

The ".ok.button" and ".cancel.button" selectors are also used by Fomantic Modal internally */}
<div className="actions">
	{(props.modalButtonDangerText) ? (<>
		<button className="ui danger red ok button">{props.modalButtonDangerText as any}</button>
	</>) : (<>
		{/* $textNegative */}
		{/* $textPositive */}
		{(props.modalButtonTypes === "confirm") ? (<>
			{/* TODO: {{$textNegative = ctx.Locale.Tr "modal.cancel"}} */}
			{/* TODO: {{$textPositive = ctx.Locale.Tr "modal.confirm"}} */}
		</>) : null}
		{(props.modalButtonCancelText) ? (<>{/* TODO: {{$textNegative = .ModalButtonCancelText}} */}</>) : null}
		{(props.modalButtonOkText) ? (<>{/* TODO: {{$textPositive = .ModalButtonOkText}} */}</>) : null}
		<button className="ui cancel button"><span className="svg-icon" aria-label="octicon-x"></span> {props.textNegative as any}</button>
		<button className="ui primary ok button"><span className="svg-icon" aria-label="octicon-check"></span> {props.textPositive as any}</button>
	</>)}
</div>

  </>)
}
