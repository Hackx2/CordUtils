/**
 * Randomly selects a object, inspired by
 * `HaxeFlixel's` randomObject function.
 */
export function randomObject(x: any): any {
  return x[Math.floor(Math.random() * x.length)];
}

/**
 * Checks if the url is discord api url, using regexp, if invalid
 * return an error message.
 */
export function validateUrl(webhookUrl: string): string | null {
  const regexp: RegExp = new RegExp("^https://discord\\.com/api/.*");
  if (!webhookUrl.match(regexp)) return "This is not a Discord webhook URL.";
  return null;
}

/**
 * Returns match details.
 */
export function grabDetails(webhookUrl: string): RegExpMatchArray | null {
  const match = webhookUrl.match(
    /https:\/\/discord\.com\/api\/webhooks\/(\d+)\/(\S+)/
  );
  if (!match) return null;
  return match;
}
