import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Repolist(props: Record<string, unknown>) {
  return (<>
<script nonce={String("" ?? "")} type="module">
const data = {
	...window.config.pageData.dashboardRepoList, // it only contains searchLimit and uid

	isMirrorsEnabled: {props.mirrorsEnabled as any},
	isStarsEnabled: {/* TODO: {{not .IsDisableStars}} */},

	canCreateMigrations: {/* TODO: {{not .DisableMigrations}} */},

	textNoOrg: {i18n("home.empty_org")},
	textNoRepo: {i18n("home.empty_repo")},
	textRepository: {i18n("repository")},
	textOrganization: {i18n("organization")},
	textMyRepos: {i18n("home.my_repos")},
	textNewRepo: {i18n("new_repo")},
	textSearchRepos: {i18n("search.repo_kind")},
	textFilter: {i18n("home.filter")},
	textShowArchived: {i18n("home.show_archived")},
	textShowPrivate: {i18n("home.show_private")},

	textShowBothArchivedUnarchived: {i18n("home.show_both_archived_unarchived")},
	textShowOnlyUnarchived: {i18n("home.show_only_unarchived")},
	textShowOnlyArchived: {i18n("home.show_only_archived")},

	textShowBothPrivatePublic: {i18n("home.show_both_private_public")},
	textShowOnlyPublic: {i18n("home.show_only_public")},
	textShowOnlyPrivate: {i18n("home.show_only_private")},

	textAll: {i18n("all")},
	textSources: {i18n("sources")},
	textForks: {i18n("forks")},
	textMirrors: {i18n("mirrors")},
	textCollaborative: {i18n("collaborative")},

	textFirstPage: {i18n("admin.first_page")},
	textPreviousPage: {i18n("repo.issues.previous")},
	textNextPage: {i18n("repo.issues.next")},
	textLastPage: {i18n("admin.last_page")},

	textMyOrgs: {i18n("home.my_orgs")},
	textNewOrg: {i18n("new_org")},

	textOrgVisibilityLimited: {i18n("org.settings.visibility.limited_shortname")},
	textOrgVisibilityPrivate: {i18n("org.settings.visibility.private_shortname")},
};

{(props.team) ? (<>
data.teamId = {props.team?.iD as any};
</>) : null}

{(!(props.contextUser?.isOrganization)) ? (<>
data.organizations = [{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{'name': {item.name as any}, 'full_name': {item.fullName as any}, 'num_repos': {item.numRepos as any}, 'org_visibility': {item.visibility as any}},</React.Fragment>))}];
data.isOrganization = false;
data.organizationsTotalCount = {props.userOrgsCount as any};
data.canCreateOrganization = {props.signedUser?.canCreateOrganization as any};
</>) : (<>
data.organizationId = {props.contextUser?.iD as any};
</>)}

window.config.pageData.dashboardRepoList = data;
</script>

<div id="dashboard-repo-list" className="flex-container-sidebar"></div>

  </>)
}
