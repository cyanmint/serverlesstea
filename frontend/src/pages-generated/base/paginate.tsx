// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Paginate(props: Record<string, unknown>) {
  return (<>
{/* $paginationParams */}
{/* $paginationLink */}
{(props.paginationLink === "AppSubUrl") ? (<>{/* TODO: {{$paginationLink = print $paginationLink "/"}} */}</>) : null}
{(props.page?.paginater) && (<>
	{((props.totalPages === "-1" || props.totalPages > 1)) ? (<>
		{/* $showFirstLast */}
		<div className="center page buttons">
			<div className="ui borderless pagination menu">
				{(props.showFirstLast) ? (<>
				<a className={`${(props.isFirst) ? `disabled` : ""} item navigation`} {...(!(props.isFirst) ? {"href": `${(props.paginationParams) ? `?` : ""}`} : {})}>
					<span className="svg-icon" aria-label="gitea-double-chevron-left"></span>
					<span className="navigation_label">{i18n("admin.first_page")}</span>
				</a>
				</>) : null}

				<a className={`${(!(props.hasPrevious)) ? `disabled` : ""} item navigation`} {...(props.hasPrevious ? {"href": `?page=${String(props.previous ?? "")}${(props.paginationParams) ? `&` : ""}`} : {})}>
					<span className="svg-icon" aria-label="octicon-chevron-left"></span>
					<span className="navigation_label">{i18n("repo.issues.previous")}</span>
				</a>
				{/* $pages */}
				{/* $pagesLen */}
				{((props.pages) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{(item.num === "-1") ? (<>
						<a className="disabled item">...</a>
					</>) : (<>
						{/* do not highlight the current page if there is only one page */}
						<a className={`${((props.isCurrent && props.pagesLen > 1)) ? `active ` : ""}item`} {...(!(item.isCurrent) ? {"href": `?page=${String(props.num ?? "")}${(props.paginationParams) ? `&` : ""}`} : {})}>{item.num as any}</a>
					</>)}
				</React.Fragment>))}
				<a className={`${(!(props.hasNext)) ? `disabled` : ""} item navigation`} {...(props.hasNext ? {"href": `?page=${String(props.next ?? "")}${(props.paginationParams) ? `&` : ""}`} : {})}>
					<span className="navigation_label">{i18n("repo.issues.next")}</span>
					<span className="svg-icon" aria-label="octicon-chevron-right"></span>
				</a>

				{(props.showFirstLast) ? (<>
				<a className={`${(props.isLast) ? `disabled` : ""} item navigation`} {...(!(props.isLast) ? {"href": `?page=${String(props.totalPages ?? "")}${(props.paginationParams) ? `&` : ""}`} : {})}>
					<span className="navigation_label">{i18n("admin.last_page")}</span>
					<span className="svg-icon" aria-label="gitea-double-chevron-right"></span>
				</a>
				</>) : null}
			</div>
		</div>
	</>) : null}
</>) }

  </>)
}
