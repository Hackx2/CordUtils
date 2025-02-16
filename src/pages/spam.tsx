import { useState } from "react";
import { LoaderIcon } from "lucide-react";

import NotiBox from "@/components/NotificationBox";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export default function WebhookSpammer() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("Spam message here...");
  const [intervalValue, setIntervalValue] = useState(1000);
  const [isSpamming, setIsSpamming] = useState(false);
  const [spamStatus, setSpamStatus] = useState("");
  const [notiStatus, setNotiStatus] = useState<"info" | "success" | "error" | "warning">("info");
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-black text-white">
      {spamStatus && (
        <NotiBox message={spamStatus} status={notiStatus} onClose={() => setSpamStatus("")} />
      )}

      <Container>
        <div className="mb-2">
          <label htmlFor="webhook-url" className="text-sm text-gray-400">
            Enter Discord Webhook URL
          </label>
          <input
            id="webhook-url"
            type="text"
            placeholder="Enter Discord Webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white mb-2"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="message" className="text-sm text-gray-400">
            Enter message to spam
          </label>
          <textarea
            id="message"
            placeholder="Enter message to spam"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white mb-2"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="interval" className="text-sm text-gray-400">
            Interval (ms)
          </label>
          <input
            id="interval"
            type="number"
            value={intervalValue}
            onChange={(e) => setIntervalValue(Number(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white mb-2"
            placeholder="Interval (ms)"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={startSpamming}
            className="w-full bg-black text-white p-2 rounded-lg border border-gray-600 hover:bg-red-600 hover:border-red-700 transition flex items-center justify-center gap-2"
            disabled={isSpamming}
          >
            {isSpamming ? (
              <>
                <LoaderIcon className="h-5 w-5 animate-spin" />
                <span>Spamming...</span>
              </>
            ) : (
              <span>Start Spamming</span>
            )}
          </button>

          {isSpamming && (
            <button
              onClick={stopSpamming}
              className="w-full bg-red-600 text-white p-2 rounded-lg border border-gray-600 hover:bg-red-700 transition"
            >
              Stop Spamming
            </button>
          )}
        </div>

        <Footer />
      </Container>
    </div>
  );
}
