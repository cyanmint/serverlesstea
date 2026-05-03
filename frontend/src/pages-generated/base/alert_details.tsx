import React from 'react'
import { i18n } from '../../lib/i18n'

export default function AlertDetails(props: Record<string, unknown>) {
  return (<>
{props.message as any}
{(props.details) ? (<>
<details>
	<summary>{props.summary as any}</summary>
	<pre>{props.details as any}</pre>
</details>
</>) : (<>
<div>{props.summary as any}</div>
</>)}

  </>)
}
