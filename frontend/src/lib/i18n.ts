// Simple i18n stub — returns the locale key as a human-readable label
export function i18n(key: string, ..._args: unknown[]): string {
  // Convert "auth.login_userpass" → "Login Userpass"
  const last = key.split('.').pop() ?? key
  return last.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
