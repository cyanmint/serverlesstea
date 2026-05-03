import { getCurrentUser } from '../api/client'
import HeadNavbar from '../pages-generated/base/head_navbar'

export default function Navbar() {
  const user = getCurrentUser()
  // Build a props shape that matches what the translated HeadNavbar template expects
  const navProps: Record<string, unknown> = {
    isSigned: !!user,
    signedUser: user
      ? {
          name: user.username,
          homeLink: `/${user.username}`,
          canCreateOrganization: true,
        }
      : null,
    isAdmin: !!(user?.isAdmin),
    mustChangePassword: false,
    showRegistrationButton: true,
    disableMigrations: false,
    disableStars: false,
    pageIsExplore: window.location.search.includes('explore'),
    pageIsUserSettings: window.location.search.includes('user/settings'),
    pageIsAdmin: window.location.search.includes('admin'),
    pageIsSignIn: window.location.search.includes('user/login'),
    pageIsSignUp: window.location.search.includes('user/sign_up'),
  }
  return <HeadNavbar {...navProps} />
}
