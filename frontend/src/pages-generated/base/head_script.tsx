import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HeadScript(props: Record<string, unknown>) {
  return (<>
{/* ==== DO NOT EDIT ====
If you are customizing Gitea, please do not change this file.
If you introduce mistakes in it, Gitea JavaScript code wouldn't run correctly. */}
<script nonce={String("" ?? "")}>
	{/* before our JS code gets loaded, use arrays to store errors, then the arrays will be switched to our error handler later */}
	window.addEventListener('error', function(e) {window._globalHandlerErrors=window._globalHandlerErrors||[]; window._globalHandlerErrors.push(e);});
	window.addEventListener('unhandledrejection', function(e) {window._globalHandlerErrors=window._globalHandlerErrors||[]; window._globalHandlerErrors.push(e);});
	window.config = {
		appUrl: '{/* TODO: {{ctx.AppFullLink "/"}} */}',
		appSubUrl: '',
		assetUrlPrefix: '{"/assets"}',
		runModeIsProd: {props.runModeIsProd as any},
		customEmojis: {/* TODO: {{CustomEmojis}} */},
		pageData: {props.pageData as any},
		notificationSettings: {/* TODO: {{NotificationSettings}} */}, {/* a map provided by NewFuncMap in helper.go */}
		enableTimeTracking: {/* TODO: {{EnableTimetracking}} */},
		mermaidMaxSourceCharacters: {/* TODO: {{MermaidMaxSourceCharacters}} */},
		sharedWorkerUri: '{/* TODO: {{AssetURI "js/eventsource.sharedworker.js"}} */}',
		{/* this global i18n object should only contain general texts. for specialized texts, it should be provided inside the related modules by: (1) API response (2) HTML data-attribute (3) PageData */}
		i18n: {
			copy_success: {i18n("copy_success")},
			copy_error: {i18n("copy_error")},
			error_occurred: {i18n("error.occurred")},
			remove_label_str: {i18n("remove_label_str")},
			modal_confirm: {i18n("modal.confirm")},
			modal_cancel: {i18n("modal.cancel")},
			more_items: {i18n("more_items")},
		},
	};
	{/* in case some pages don't render the pageData, we make sure it is an object to prevent null access */}
	window.config.pageData = window.config.pageData || {};
</script>
{/* TODO: {{ctx.ScriptImport "js/iife.js"}} */}

  </>)
}
