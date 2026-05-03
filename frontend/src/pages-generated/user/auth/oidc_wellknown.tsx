import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function OidcWellknown(props: Record<string, unknown>) {
  return (<>
{
    "issuer": "{props.oidcIssuer as any}",
    "authorization_endpoint": "{props.oidcBaseUrl as any}/login/oauth/authorize",
    "token_endpoint": "{props.oidcBaseUrl as any}/login/oauth/access_token",
    "jwks_uri": "{props.oidcBaseUrl as any}/login/oauth/keys",
    "userinfo_endpoint": "{props.oidcBaseUrl as any}/login/oauth/userinfo",
    "introspection_endpoint": "{props.oidcBaseUrl as any}/login/oauth/introspect",
    "response_types_supported": [
        "code",
        "id_token"
    ],
    "id_token_signing_alg_values_supported": [
        "{props.signingKeyMethodAlg as any}"
    ],
    "subject_types_supported": [
        "public"
    ],
    "scopes_supported": [
        "openid",
        "profile",
        "email",
        "groups"
    ],
    "claims_supported": [
        "aud",
        "exp",
        "iat",
        "iss",
        "sub",
        "name",
        "preferred_username",
        "profile",
        "picture",
        "website",
        "locale",
        "updated_at",
        "email",
        "email_verified",
        "groups"
    ],
    "code_challenge_methods_supported": [
        "plain",
        "S256"
    ],
    "grant_types_supported": [
        "authorization_code",
        "refresh_token"
    ]
}

  </>)
}
