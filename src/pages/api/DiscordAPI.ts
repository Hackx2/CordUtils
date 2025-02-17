import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message?: string;
  error?: string;
}

const sendToDiscord = async (webhookUrl: string, message: string) => {
  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  if (discordResponse.ok) return discordResponse;

  const rateLimitRemaining = discordResponse.headers.get("X-RateLimit-Remaining");
  const rateLimitReset = discordResponse.headers.get("X-RateLimit-Reset");
  const retryAfter = discordResponse.headers.get("Retry-After");

  if (rateLimitRemaining === "0" && rateLimitReset && retryAfter) {
    const waitTime = Math.max(Number(retryAfter) * 1000, 1000);
    console.log(`Rate limit reached. Retrying in ${waitTime / 1000} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return sendToDiscord(webhookUrl, message);
  }

  throw new Error(`Discord API error: ${discordResponse.status}`);
};

const deleteWebhook = async (webhookId: string, webhookToken: string) => {
  const discordResponse = await fetch(
    `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`,
    { method: "DELETE" }
  );

  if (discordResponse.ok) return discordResponse;

  const rateLimitRemaining = discordResponse.headers.get("X-RateLimit-Remaining");
  const rateLimitReset = discordResponse.headers.get("X-RateLimit-Reset");
  const retryAfter = discordResponse.headers.get("Retry-After");

  if (rateLimitRemaining === "0" && rateLimitReset && retryAfter) {
    const waitTime = Math.max(Number(retryAfter) * 1000, 1000);
    console.log(`Rate limit reached. Retrying in ${waitTime / 1000} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return deleteWebhook(webhookId, webhookToken);
  }

  throw new Error(`Discord API error: ${discordResponse.status}`);
};

export default async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;

  if (method === "POST") {
    const { webhookUrl, message } = req.body as {
      webhookUrl?: string;
      message?: string;
    };

    if (!webhookUrl || !message)
      return res.status(400).json({ error: "Missing webhook URL or message" });

    try {
      await sendToDiscord(webhookUrl, message);
      res.json({ message: "Message sent successfully" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Failed to send message" });
    }
  } else if (method === "DELETE") {
    const { webhookId, webhookToken } = req.body as {
      webhookId?: string;
      webhookToken?: string;
    };

    if (!webhookId || !webhookToken)
      return res.status(400).json({ error: "Missing webhook ID or token" });

    try {
      await deleteWebhook(webhookId, webhookToken);
      res.json({ message: "Webhook successfully deleted" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete webhook" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
