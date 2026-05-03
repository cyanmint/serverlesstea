// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Profile(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user profile">
	<div className="ui container">
		<div className="ui stackable grid">
			<div className="ui four wide column">
				{/* template: shared/user/profile_big_avatar */}
			</div>
			<div className="ui twelve wide column tw-mb-4">
				{/* template: user/overview/header */}
				{(props.tabName === "activity") ? (<>
					{(props.contextUser?.keepActivityPrivate) ? (<>
						<div className="ui info message">
							<p>{i18n("user.disabled_public_activity")}</p>
						</div>
					</>) : null}
					{/* template: user/heatmap */}
					{/* template: user/dashboard/feeds */}
				</>) : null} {(props.tabName === "stars") ? (<>
					<div className="stars">
						{/* template: shared/repo/search */}
						{/* template: shared/repo/list */}
						{/* template: base/paginate */}
					</div>
				</>) : null} {(props.tabName === "following") ? (<>
					{/* template: repo/user_cards */}
				</>) : null} {(props.tabName === "followers") ? (<>
					{/* template: repo/user_cards */}
				</>) : null} {(props.tabName === "overview") ? (<>
					<div id="readme_profile" className="render-content markup">{props.profileReadmeContent as any}</div>
				</>) : null} {(props.tabName === "organizations") ? (<>
					{/* template: repo/user_cards */}
				</>) : (<>
					{/* template: shared/repo/search */}
					{/* template: shared/repo/list */}
					{/* template: base/paginate */}
				</>)}
			</div>
		</div>
	</div>
</div>


  </>)
}
