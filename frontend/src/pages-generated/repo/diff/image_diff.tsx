import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ImageDiff(props: Record<string, unknown>) {
  return (<>
{((props.blobBase || props.blobHead)) ? (<>
<tr>
	<td colspan="2">
		<div className="image-diff"
			data-path-before={`${String(props.root?.beforeRawPath ?? "")}/`}
			data-path-after={`${String(props.root?.rawPath ?? "")}/`}
			data-mime-before={String(props.sniffedTypeBase?.getMimeType ?? "")}
			data-mime-after={String(props.sniffedTypeHead?.getMimeType ?? "")}
		>
			<overflow-menu className="ui secondary pointing tabular menu">
				<div className="overflow-menu-items tw-justify-center" data-global-init="initTabSwitcher">
					<a className="item active" data-tab={`diff-side-by-side-${String(props.file?.nameHash ?? "")}`}>{i18n("repo.diff.image.side_by_side")}</a>
					{((props.blobBase && props.blobHead)) ? (<>
					<a className="item" data-tab={`diff-swipe-${String(props.file?.nameHash ?? "")}`}>{i18n("repo.diff.image.swipe")}</a>
					<a className="item" data-tab={`diff-overlay-${String(props.file?.nameHash ?? "")}`}>{i18n("repo.diff.image.overlay")}</a>
					</>) : null}
				</div>
			</overflow-menu>
			<div className="image-diff-tabs is-loading">
				<div className="ui bottom attached tab image-diff-container active" data-tab={`diff-side-by-side-${String(props.file?.nameHash ?? "")}`}>
					<div className="diff-side-by-side">
						{(props.blobBase) ? (<>
						<span className="side">
							<p className="side-header">{i18n("repo.diff.file_before")}</p>
							<span className="before-container"><img alt className="image-before" /></span>
							<p>
								<span className="bounds-info-before">
									{i18n("repo.diff.file_image_width")}: <span className="text bounds-info-width"></span>
									&nbsp;|&nbsp;
									{i18n("repo.diff.file_image_height")}: <span className="text bounds-info-height"></span>
									&nbsp;|&nbsp;
								</span>
								{i18n("repo.diff.file_byte_size")}: <span className="text">{/* TODO: {{FileSize .blobBase.Size}} */}</span>
							</p>
						</span>
						</>) : null}
						{(props.blobHead) ? (<>
						<span className="side">
							<p className="side-header">{i18n("repo.diff.file_after")}</p>
							<span className="after-container"><img alt className="image-after" /></span>
							<p>
								<span className="bounds-info-after">
									{i18n("repo.diff.file_image_width")}: <span className="text bounds-info-width"></span>
									&nbsp;|&nbsp;
									{i18n("repo.diff.file_image_height")}: <span className="text bounds-info-height"></span>
									&nbsp;|&nbsp;
								</span>
								{i18n("repo.diff.file_byte_size")}: <span className="text">{/* TODO: {{FileSize .blobHead.Size}} */}</span>
							</p>
						</span>
						</>) : null}
					</div>
				</div>
				{((props.blobBase && props.blobHead)) ? (<>
				<div className="ui bottom attached tab image-diff-container" data-tab={`diff-swipe-${String(props.file?.nameHash ?? "")}`}>
					<div className="diff-swipe">
						<div className="swipe-frame">
							<span className="before-container"><img alt className="image-before" /></span>
							<span className="swipe-container">
								<span className="after-container"><img alt className="image-after" /></span>
							</span>
							<span className="swipe-bar">
								<span className="handle top-handle"></span>
								<span className="handle bottom-handle"></span>
							</span>
						</div>
					</div>
				</div>
				<div className="ui bottom attached tab image-diff-container" data-tab={`diff-overlay-${String(props.file?.nameHash ?? "")}`}>
					<div className="diff-overlay">
						<input type="range" min="0" max="100" value="50" />
						<div className="overlay-frame">
							<span className="before-container"><img alt className="image-before" /></span>
							<span className="after-container"><img alt className="image-after" /></span>
						</div>
					</div>
				</div>
				</>) : null}
			</div>
		</div>
	</td>
</tr>
</>) : null}

  </>)
}
