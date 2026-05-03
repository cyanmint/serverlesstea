// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitSignBadge(props: Record<string, unknown>) {
  return (<>
{/* Template attributes:
* Commit
* CommitBaseLink
* CommitSignVerification
If you'd like to modify this template, you could test it on the devtest page.
ATTENTION: this template could be re-rendered many times (on the graph and commit list page),
so this template should be kept as small as possible, DO NOT put large components like modal/dialog into it. */}
{/* $commit */}
{/* $commitBaseLink */}
{/* $verification */}{/* asymkey.CommitVerification */}

{/* $extraClass */}
{/* $verified */}
{/* $signingUser */}
{/* $signingEmail */}
{/* $msgReasonPrefix */}
{/* $msgReason */}
{/* $msgSigningKey */}

{(props.verification) ? (<>
	{/* TODO: {{$signingUser = $verification.SigningUser}} */}
	{/* TODO: {{$signingEmail = $verification.SigningEmail}} */}
	{/* TODO: {{$extraClass = print $extraClass " commit-is-signed"}} */}
	{(props.verification?.verified) ? (<>
		{/* reason is "{name} / {key-id}" */}
		{/* TODO: {{$msgReason = $verification.Reason}} */}
		{/* TODO: {{$verified = true}} */}
		{(props.verification?.trustStatus === "trusted") ? (<>
			{/* TODO: {{$extraClass = print $extraClass " sign-trusted"}} */}
		</>) : null} {(props.verification?.trustStatus === "untrusted") ? (<>
			{/* TODO: {{$extraClass = print $extraClass " sign-untrusted"}} */}
			{/* TODO: {{$msgReasonPrefix = ctx.Locale.Tr "repo.commits.signed_by_untrusted_user"}} */}
		</>) : (<>
			{/* TODO: {{$extraClass = print $extraClass " sign-unmatched"}} */}
			{/* TODO: {{$msgReasonPrefix = ctx.Locale.Tr "repo.commits.signed_by_untrusted_user_unmatched"}} */}
		</>)}
	</>) : (<>
		{(props.verification?.warning) ? (<>
			{/* TODO: {{$extraClass = print $extraClass " sign-warning"}} */}
		</>) : (<>
			{/* TODO: {{$extraClass = ""}} */}{/* the commit is not signed */}
		</>)}
		{/* TODO: {{$msgReason = ctx.Locale.Tr $verification.Reason}} */}{/* dirty part: it is the translation key ..... */}
	</>)}

	{(props.msgReasonPrefix) ? (<>
		{/* TODO: {{$msgReason = print $msgReasonPrefix ": " $msgReason}} */}
	</>) : null}

	{(props.verification?.signingSSHKey) ? (<>
		{/* TODO: {{$msgSigningKey = print (ctx.Locale.Tr "repo.commits.ssh_key_fingerprint") ": " $verification.SigningSSHKey.Fingerprint}} */}
	</>) : null} {(props.verification?.signingKey) ? (<>{/* asymkey.GPGKey */}
		{/* TODO: {{$msgSigningKey = print (ctx.Locale.Tr "repo.commits.gpg_key_id") ": " $verification.SigningKey.PaddedKeyID}} */}
	</>) : null}
</>) : null}

{(props.commit) ? (<>
<a {...(props.commitBaseLink ? {"href": `/`} : {})} className={`ui label commit-id-short `} rel="nofollow">
	{/* TODO: {{ShortSha $commit.ID.String}} */}
</>) : null}
{((!(props.commit) || props.extraClass)) ? (<>{/* only show the lock icon if there is no commit info (icon only) or the commit is really signed */}
	<span className={`ui label commit-sign-badge `}>
		{(props.verified) ? (<>
			{((props.signingUser && props.signingUser?.iD)) ? (<>
				<span data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="gitea-lock"></span></span>
				<span data-tooltip-content={String("" ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar $signingUser 16}} */}</span>
			</>) : (<>
				<span data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="gitea-lock-cog"></span></span>
				<span data-tooltip-content={String("" ?? "")}>{/* TODO: {{ctx.AvatarUtils.AvatarByEmail $signingEmail "" 16}} */}</span>
			</>)}
		</>) : (<>
			<span data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="gitea-unlock"></span></span>
		</>)}
	</span>
</>) : null}
{(props.commit) ? (<>
</a>
</>) : null}

{/* This template should be kept as small as possible, DO NOT put large components like modal/dialog into it. */}

  </>)
}
