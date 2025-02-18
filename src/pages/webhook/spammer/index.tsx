import { LoaderIcon, Play } from "lucide-react";
import { useState } from "react";

// Components
import NotiBox from "@/components/NotificationBox";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

// Hooks
import webhookSpam from "@/hooks/webhookSpammer";

export default function Spam() {
  const handler = webhookSpam();

  const [openNoti, setOpenNoti] = useState(true); // FUCK OFF

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 text-white">
      <title>CordUtils - Webhook Spammer 🥩</title>

      {openNoti && (
        <NotiBox
          message={`prob against Discord's TOS; sooooooooo, don't use this.`}
          status="Info"
          onClose={() => setOpenNoti(false)}
          className="max-w-[650px]"
        />
      )}

      {handler.spamStatus && (
        <NotiBox className="max-w-[650px]" message={handler.spamStatus} status={handler.notiStatus} onClose={() => handler.setSpamStatus("")} />
      )}

      <Container className="max-w-[750px]">
        <div className="mb-2">
          <h1 className="text-xl font-bold mb-4">./spammer</h1>
          <label htmlFor="webhook-url" className="text-sm text-gray-400">
            Webhook URL
          </label>
          <input
            id="webhook-url"
            type="text"
            placeholder="Enter Webhook URL"
            value={handler.webhookUrl}
            onChange={(e) => handler.setWebhookUrl(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black/30 text-white focus:outline-none focus:ring-1 focus:ring-white mb-2 shadow-lg backdrop-blur-lg"
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
            className="w-full max-h-[100px] p-3 rounded-lg border border-gray-600 bg-black/30 text-white focus:outline-none focus:ring-1 focus:ring-white mb-2 shadow-lg backdrop-blur-lg"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="interval" className="text-sm text-gray-400">
            Interval(ms)
          </label>
          <input
            id="interval"
            type="number"
            value={handler.intervalValue}
            onChange={(e) => handler.setIntervalValue(Number(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black/30 text-white focus:outline-none focus:ring-1 focus:ring-white mb-2 shadow-lg backdrop-blur-lg"
            placeholder="Interval (ms)"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handler.startSpamming}
            className={`w-full bg-black/30 text-white p-2 rounded-lg border border-gray-600 ${handler.isSpamming ? "" : "hover:border-red-700"} transition flex items-center justify-center gap-2 shadow-lg backdrop-blur-lg`}
            disabled={handler.isSpamming}
          >
            {handler.isSpamming ? (
              <>
                <LoaderIcon className="h-5 w-5 animate-spin" />
                <span>Spamming...</span>
              </>
            ) : (
              <>
              <Play className="h-5 w-5" />
              <span>Start</span>
             </>
            )}
          </button>

          {handler.isSpamming && (
            <button
              onClick={handler.stopSpamming}
              className="w-full bg-black/30 text-white p-2 rounded-lg border border-gray-600 hover:border-red-700 transition shadow-lg backdrop-blur-lg"
            >
              kill
            </button>
          )}
        </div>

        {/* <Footer /> */}
      </Container>
    </div>
  );
}// ITZ MASSIVE -ninja
