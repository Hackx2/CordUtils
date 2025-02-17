import { useState } from "react";
import { validateUrl, grabDetails } from "@/utils/webhookUtils"; 

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

    const validationError = validateUrl(webhookUrl);
    if (validationError) {
      setMessage(validationError);
      setIsDeleting(false);
      return;
    }

    const match = grabDetails(webhookUrl);
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

      const data = await response.json();

      if (response.ok) {
        setDeleted(true);
        setMessage(data.message);
      } else {
        setDeleted(false);
        setMessage(data.error || "An error occurred while deleting the webhook.");
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
