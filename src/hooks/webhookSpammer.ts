import { useState } from "react";

//i kinda like spam(da food)
export default function useWebhookSpammer() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("Spam message here...");
  const [intervalValue, setIntervalValue] = useState(1000);
  const [isSpamming, setIsSpamming] = useState(false);
  const [spamStatus, setSpamStatus] = useState("");
  const [notiStatus, setNotiStatus] = useState<
    "info" | "success" | "error" | "warning"
  >("info");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startSpamming = async () => {
    if (!webhookUrl || !message) {
      setSpamStatus("Please provide a webhook URL and a message.");
      setNotiStatus("error");
      return;
    }

    setIsSpamming(true);
    setSpamStatus("Spamming...");
    setNotiStatus("info");

    const sendSpamMessage = async () => {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: message }),
        });
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
    webhookUrl, // webhook
    setWebhookUrl,

    message, // message stuff
    setMessage,

    setIntervalValue, // interval stuff
    intervalValue,
    intervalId,
    setIntervalId,

    isSpamming, //spammin stuff
    setIsSpamming,
    spamStatus,
    setSpamStatus,
    stopSpamming,
    startSpamming,

    notiStatus, // noti stuff
    setNotiStatus,
  };
}
