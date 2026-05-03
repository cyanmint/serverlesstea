// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Label(props: Record<string, unknown>) {
  return (<>
{/* Template Attributes:
* Release: the release
* IsLatest: boolean indicating whether this is the latest release, optional */}
{(props.isLatest) ? (<>
	<span className="ui green label">{i18n("repo.release.latest")}</span>
</>) : null} {(props.release?.isDraft) ? (<>
	<span className="ui yellow label">{i18n("repo.release.draft")}</span>
</>) : null} {(props.release?.isPrerelease) ? (<>
	<span className="ui orange label">{i18n("repo.release.prerelease")}</span>
</>) : null} {(!(props.release?.isTag)) ? (<>
	<span className="ui green label">{i18n("repo.release.stable")}</span>
</>) : null}

  </>)
}
