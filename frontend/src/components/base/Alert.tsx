interface AlertProps {
  flash?: { errorMsg?: string; warningMsg?: string; infoMsg?: string; successMsg?: string }
}
export default function Alert({ flash }: AlertProps) {
  if (!flash) return null
  return (
    <>
      {flash.errorMsg && <div className="ui error message flash-message flash-error">{flash.errorMsg}</div>}
      {flash.warningMsg && <div className="ui warning message flash-message flash-warning">{flash.warningMsg}</div>}
      {flash.infoMsg && <div className="ui info message flash-message flash-info">{flash.infoMsg}</div>}
      {flash.successMsg && <div className="ui positive message flash-message flash-success">{flash.successMsg}</div>}
    </>
  )
}
