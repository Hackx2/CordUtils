import { useState } from "react";

export default function WebhookDelete() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    if (!webhookUrl) {
      setMessage("Please enter a webhook URL.");
      setDeleted(false);
      setIsDeleting(false);
      return;
    }

    const regex = new RegExp("^https://discord\\.com/api/.*");
    if (!webhookUrl.match(regex)) {
      setMessage("This is not a Discord webhook URL.");
      setIsDeleting(false);
      return;
    }

    const match = webhookUrl.match(
      /https:\/\/discord\.com\/api\/webhooks\/(\d+)\/(\S+)/
    );
    if (!match) {
      setMessage("Invalid webhook URL");
      setIsDeleting(false);
      return;
    }

    const [, webhookId, webhookToken] = match;

    try {
      const response = await fetch("/api/DiscordAPI", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId, webhookToken }),
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const retryTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : 60 * 1000;

        setDeleted(false);
        setMessage(
          `Rate limit exceeded. Please try again after ${
            retryTime / 1000
          } seconds.`
        );

        setTimeout(() => setMessage(""), retryTime);

        setIsDeleting(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setDeleted(true);
        setMessage(data.message);
      } else {
        setDeleted(false);
        setMessage(
          data.error || "An error occurred while deleting the webhook."
        );
      }
    } catch (error) {
      setDeleted(false);
      setMessage("Failed to delete webhook.");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    webhookUrl,
    setWebhookUrl,
    message,
    setMessage,
    deleted,
    setDeleted,
    isDeleting,
    handleDelete,
  };
}
