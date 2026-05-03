import { Env } from './index'

function buildMimeMessage(from: string, to: string, subject: string, text: string): string {
  return [
    'MIME-Version: 1.0',
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    text,
  ].join('\r\n')
}

export async function sendWelcomeEmail(env: Env, to: string, username: string): Promise<void> {
  if (!env.SEND_EMAIL || !env.EMAIL_FROM) return

  const { EmailMessage } = await import('cloudflare:email')

  const subject = 'Welcome to ServerlessTea'
  const text = [
    `Hi ${username},`,
    '',
    'Welcome to ServerlessTea! Your account has been created successfully.',
    '',
    'You can now log in and start hosting your Git repositories.',
    '',
    '– The ServerlessTea Team',
  ].join('\n')

  const raw = buildMimeMessage(env.EMAIL_FROM, to, subject, text)
  const message = new EmailMessage(env.EMAIL_FROM, to, raw)
  await env.SEND_EMAIL.send(message)
}
