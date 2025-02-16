import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  error?: string;
};

export default async function daLol(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "DELETE")
    return res.status(405).json({ error: "Method not allowed" });

  const { webhookId, webhookToken } = req.body as {
    webhookId?: string;
    webhookToken?: string;
  };

  if (!webhookId || !webhookToken) {
    return res.status(400).json({ error: "Missing webhook ID or token" });
  }

  try {
    const discordResponse = await fetch(
      `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`,
      { method: "DELETE" }
    );

    if (!discordResponse.ok) 
      throw new Error(`Discord API error: ${discordResponse.status}`);
    
    res.json({ message: "Webhook successfully deleted" });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete webhook" });
  }
}
