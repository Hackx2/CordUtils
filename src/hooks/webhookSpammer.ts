import { useState } from "react";
import { validateUrl, grabDetails } from "@/utils/webhookUtils"; 
// I kinda like spam (da food)
export default function WebhookSpammer() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [intervalValue, setIntervalValue] = useState(1000);
  const [isSpamming, setIsSpamming] = useState(false);
  const [spamStatus, setSpamStatus] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [notiStatus, setNotiStatus] = useState<
    "info" | "success" | "error" | "warning"
  >("info");

  const startSpamming = async () => {
    if (!webhookUrl || !message) {
      if (!webhookUrl || !message)
        setSpamStatus(
          `Please provide a ${
            !webhookUrl && !message
              ? "webhook URL and a message"
              : !message
              ? "message"
              : "webhook URL"
          }.`
        );
      setNotiStatus("error");
      return;
    }

    const validationError = validateUrl(webhookUrl);
    if (validationError) {
      setSpamStatus(validationError);
      setNotiStatus("error");
      return;
    }

    const match = grabDetails(webhookUrl);
    if (!match) {
      setSpamStatus("Invalid webhook URL");
      setNotiStatus("error");
      return;
    }

    setIsSpamming(true);
    setSpamStatus("Spamming...");
    setNotiStatus("info");

    const sendSpamMessage = async () => {
      try {
        const response = await fetch("/api/DiscordAPI", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ webhookUrl, message }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unknown error");
      } catch (error) {
        setSpamStatus("Failed to send message.");
        setNotiStatus("error");
      }
    };

    const id = setInterval(sendSpamMessage, intervalValue);
    setIntervalId(id);
  };

  const stopSpamming = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsSpamming(false);
      setSpamStatus("Spamming stopped.");
      setNotiStatus("success");
    }
  };

  return {
    webhookUrl,
    setWebhookUrl,
    message,
    setMessage,
    setIntervalValue,
    intervalValue,
    intervalId,
    setIntervalId,
    isSpamming,
    setIsSpamming,
    spamStatus,
    setSpamStatus,
    stopSpamming,
    startSpamming,
    notiStatus,
    setNotiStatus,
  };
}
