import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Paginate(props: Record<string, unknown>) {
  return (<>
{/* $paginationParams */}
{/* $paginationLink */}
{(paginationLink === "AppSubUrl") ? (<>{/* TODO: {{$paginationLink = print $paginationLink "/"}} */}</>) : null}
{(props.page?.paginater) && (<>
	{((props.totalPages === "-1" || props.totalPages > 1)) ? (<>
		{/* $showFirstLast */}
		<div className="center page buttons">
			<div className="ui borderless pagination menu">
				{(showFirstLast) ? (<>
				<a className={`${(props.isFirst) ? `disabled` : ""} item navigation`} {...(!(props.isFirst) ? {"href": `${(paginationParams) ? `?` : ""}`} : {})}>
					<span className="svg-icon" aria-label="gitea-double-chevron-left"></span>
					<span className="navigation_label">{i18n("admin.first_page")}</span>
				</a>
				</>) : null}

				<a className={`${(!(props.hasPrevious)) ? `disabled` : ""} item navigation`} {...(props.hasPrevious ? {"href": `?page=${String(props.previous ?? "")}${(paginationParams) ? `&` : ""}`} : {})}>
					<span className="svg-icon" aria-label="octicon-chevron-left"></span>
					<span className="navigation_label">{i18n("repo.issues.previous")}</span>
				</a>
				{/* $pages */}
				{/* $pagesLen */}
				{(((undefined /* $pages */)) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{(item.num === "-1") ? (<>
						<a className="disabled item">...</a>
					</>) : (<>
						{/* do not highlight the current page if there is only one page */}
						<a className={`${((props.isCurrent && pagesLen > 1)) ? `active ` : ""}item`} {...(!(item.isCurrent) ? {"href": `?page=${String(props.num ?? "")}${(paginationParams) ? `&` : ""}`} : {})}>{item.num as any}</a>
					</>)}
				</React.Fragment>))}
				<a className={`${(!(props.hasNext)) ? `disabled` : ""} item navigation`} {...(props.hasNext ? {"href": `?page=${String(props.next ?? "")}${(paginationParams) ? `&` : ""}`} : {})}>
					<span className="navigation_label">{i18n("repo.issues.next")}</span>
					<span className="svg-icon" aria-label="octicon-chevron-right"></span>
				</a>

				{(showFirstLast) ? (<>
				<a className={`${(props.isLast) ? `disabled` : ""} item navigation`} {...(!(props.isLast) ? {"href": `?page=${String(props.totalPages ?? "")}${(paginationParams) ? `&` : ""}`} : {})}>
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
