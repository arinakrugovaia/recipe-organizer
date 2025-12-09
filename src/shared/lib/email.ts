export function maskEmail(email?: string | null) {
  if (!email) return 'user'
  const [name, domain] = email.split('@')
  return `${name.slice(0, 3)}...@${domain}`
}
