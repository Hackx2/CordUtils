import { LoaderIcon } from "lucide-react";

// Components
import NotiBox from "@/components/NotificationBox";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

// Hooks
import webhookSpam from "@/hooks/webhookSpammer";

export default function Spam() {
  const handler = webhookSpam();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-black text-white">
      <title>CordUtils - Webhook Spammer 🥩</title>
      {handler.spamStatus && (
        <NotiBox message={handler.spamStatus} status={handler.notiStatus} onClose={() => handler.setSpamStatus("")} />
      )}

      <Container>
        <div className="mb-2">
          <label htmlFor="webhook-url" className="text-sm text-gray-400">
            Discord Webhook URL:
          </label>
          <input
            id="webhook-url"
            type="text"
            placeholder="Webhook URL"
            value={handler.webhookUrl}
            onChange={(e) => handler.setWebhookUrl(e.target.value)}
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
            value={handler.message}
            onChange={(e) => handler.setMessage(e.target.value)}
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
            value={handler.intervalValue}
            onChange={(e) => handler.setIntervalValue(Number(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white mb-2"
            placeholder="Interval (ms)"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handler.startSpamming}
            className="w-full bg-black text-white p-2 rounded-lg border border-gray-600 hover:bg-red-600 hover:border-red-700 transition flex items-center justify-center gap-2"
            disabled={handler.isSpamming}
          >
            {handler.isSpamming ? (
              <>
                <LoaderIcon className="h-5 w-5 animate-spin" />
                <span>Spamming...</span>
              </>
            ) : (
              <span>Start Spamming</span>
            )}
          </button>

          {handler.isSpamming && (
            <button
              onClick={handler.stopSpamming}
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
