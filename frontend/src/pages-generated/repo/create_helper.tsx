// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CreateHelper(props: Record<string, unknown>) {
  return (<>
{(!(props.disableMigrations)) ? (<>
	<p className="ui center">{i18n("repo.new_repo_helper")}</p>
</>) : null}

  </>)
}
