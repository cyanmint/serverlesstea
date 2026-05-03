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
{/* TODO: {{- $commit := $.Commit -}} */}
{/* TODO: {{- $commitBaseLink := $.CommitBaseLink -}} */}
{/* TODO: {{- $verification := $.CommitSignVerification -}} */}{/* TODO: {{- /* asymkey.CommitVerification * / -}} */}

{/* TODO: {{- $extraClass := "" -}} */}
{/* TODO: {{- $verified := false -}} */}
{/* TODO: {{- $signingUser := NIL -}} */}
{/* TODO: {{- $signingEmail := "" -}} */}
{/* TODO: {{- $msgReasonPrefix := "" -}} */}
{/* TODO: {{- $msgReason := "" -}} */}
{/* TODO: {{- $msgSigningKey := "" -}} */}

{/* TODO: {{- if $verification -}} */}
	{/* TODO: {{- $signingUser = $verification.SigningUser -}} */}
	{/* TODO: {{- $signingEmail = $verification.SigningEmail -}} */}
	{/* TODO: {{- $extraClass = print $extraClass " commit-is-signed" -}} */}
	{/* TODO: {{- if $verification.Verified -}} */}
		{/* TODO: {{- /* reason is "{name} / {key-id}" * / -}} */}
		{/* TODO: {{- $msgReason = $verification.Reason -}} */}
		{/* TODO: {{- $verified = true -}} */}
		{/* TODO: {{- if eq $verification.TrustStatus "trusted" -}} */}
			{/* TODO: {{- $extraClass = print $extraClass " sign-trusted" -}} */}
		{/* TODO: {{- else if eq $verification.TrustStatus "untrusted" -}} */}
			{/* TODO: {{- $extraClass = print $extraClass " sign-untrusted" -}} */}
			{/* TODO: {{- $msgReasonPrefix = ctx.Locale.Tr "repo.commits.signed_by_untrusted_user" -}} */}
		{/* TODO: {{- else -}} */}
			{/* TODO: {{- $extraClass = print $extraClass " sign-unmatched" -}} */}
			{/* TODO: {{- $msgReasonPrefix = ctx.Locale.Tr "repo.commits.signed_by_untrusted_user_unmatched" -}} */}
		{/* TODO: {{- end -}} */}
	{/* TODO: {{- else -}} */}
		{/* TODO: {{- if $verification.Warning -}} */}
			{/* TODO: {{- $extraClass = print $extraClass " sign-warning" -}} */}
		{/* TODO: {{- else -}} */}
			{/* TODO: {{- $extraClass = "" -}} */}{/* the commit is not signed */}
		{/* TODO: {{- end -}} */}
		{/* TODO: {{- $msgReason = ctx.Locale.Tr $verification.Reason -}} */}{/* TODO: {{- /* dirty part: it is the translation key ..... * / -}} */}
	{/* TODO: {{- end -}} */}

	{/* TODO: {{- if $msgReasonPrefix -}} */}
		{/* TODO: {{- $msgReason = print $msgReasonPrefix ": " $msgReason -}} */}
	{/* TODO: {{- end -}} */}

	{/* TODO: {{- if $verification.SigningSSHKey -}} */}
		{/* TODO: {{- $msgSigningKey = print (ctx.Locale.Tr "repo.commits.ssh_key_fingerprint") ": " $verification.SigningSSHKey.Fingerprint -}} */}
	{/* TODO: {{- else if $verification.SigningKey -}} */}{/* TODO: {{- /* asymkey.GPGKey * / -}} */}
		{/* TODO: {{- $msgSigningKey = print (ctx.Locale.Tr "repo.commits.gpg_key_id") ": " $verification.SigningKey.PaddedKeyID -}} */}
	{/* TODO: {{- end -}} */}
{/* TODO: {{- end -}} */}

{/* TODO: {{- if $commit -}} */}
<a {...(commitBaseLink ? {"href": `/`} : {})} className={`ui label commit-id-short `} rel="nofollow">
	{/* TODO: {{- ShortSha $commit.ID.String -}} */}
{/* TODO: {{- end -}} */}
{/* TODO: {{- if or (not $commit) $extraClass}} */}{/* only show the lock icon if there is no commit info (icon only) or the commit is really signed */}
	<span className={`ui label commit-sign-badge `}>
		{/* TODO: {{- if $verified -}} */}
			{/* TODO: {{- if and $signingUser $signingUser.ID -}} */}
				<span data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="gitea-lock"></span></span>
				<span data-tooltip-content={String("" ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar $signingUser 16}} */}</span>
			{/* TODO: {{- else -}} */}
				<span data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="gitea-lock-cog"></span></span>
				<span data-tooltip-content={String("" ?? "")}>{/* TODO: {{ctx.AvatarUtils.AvatarByEmail $signingEmail "" 16}} */}</span>
			{/* TODO: {{- end -}} */}
		{/* TODO: {{- else -}} */}
			<span data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="gitea-unlock"></span></span>
		{/* TODO: {{- end -}} */}
	</span>
{/* TODO: {{- end -}} */}
{/* TODO: {{- if $commit -}} */}
</a>
{/* TODO: {{- end -}} */}

{/* TODO: {{- /* This template should be kept as small as possible, DO NOT put large components like modal/dialog into it. * / -}} */}

  </>)
}
