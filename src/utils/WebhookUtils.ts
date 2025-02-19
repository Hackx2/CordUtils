export function validateUrl(webhookUrl: string): string | null {
  const regex = new RegExp("^https://discord\\.com/api/.*");
  if (!webhookUrl.match(regex)) return "This is not a Discord webhook URL.";
  return null;
}
export function grabDetails(webhookUrl: string): RegExpMatchArray | null {
  const match = webhookUrl.match(/https:\/\/discord\.com\/api\/webhooks\/(\d+)\/(\S+)/);
  if (!match)
    return null;
  return match;
}
