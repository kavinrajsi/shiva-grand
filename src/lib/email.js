const SANDBOX_DOMAIN = "@resend.dev";

export function isSandboxSender(from) {
  return Boolean(from) && from.trim().toLowerCase().endsWith(SANDBOX_DOMAIN);
}

// In Resend sandbox mode (sender on @resend.dev with no verified domain),
// delivery is only allowed to the account owner. Route everything there and
// drop cc/bcc so sends stop failing with a 403 validation_error. Verify a
// domain at resend.com/domains and point RESEND_FROM_EMAIL at it for production.
export function resolveRecipients({ from, to, cc, bcc }) {
  if (!isSandboxSender(from)) return { to, cc, bcc };
  const owner = process.env.RESEND_SANDBOX_TO;
  return { to: owner || to, cc: undefined, bcc: undefined };
}
