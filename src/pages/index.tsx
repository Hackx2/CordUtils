import { useState } from "react";
import { Trash2Icon, LoaderIcon } from "lucide-react";
import NotiBox from "../components/NotificationBox";
import Footer from "@/components/Footer";

export default function Home() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleWebhookChange = (e:any) => {
    setWebhookUrl(e.target.value);
    setDeleted(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleted(false);

    if (!webhookUrl) {
      setMessage("Please enter a webhook URL.");
      setIsDeleting(false);
      return;
    }

    const regex = new RegExp("^https://discord\\.com/api/.*");
    if (!webhookUrl.match(regex)) {
      setMessage("This is not a Discord webhook URL.");
      setIsDeleting(false);
      return;
    }

    const match = webhookUrl.match(/https:\/\/discord\.com\/api\/webhooks\/(\d+)\/(\S+)/);
    if (!match) {
      setMessage("Invalid webhook URL");
      setIsDeleting(false);
      return;
    }

    const [, webhookId, webhookToken] = match;

    try {
      const response = await fetch("/api/deleteWebhook", {
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
        setMessage(data.error);
      }
    } catch (error) {
      setDeleted(false);
      setMessage("Failed to delete webhook");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-black text-white">
      {message && (
        <NotiBox
          message={message}
          deleted={deleted}
          onClose={() => setMessage("")}
        />
      )}

      <main className="flex flex-col gap-2 w-full max-w-md p-6 rounded-lg shadow-lg backdrop-blur-md border border-gray-700">
        <input
          type="text"
          placeholder="Enter Discord Webhook URL"
          value={webhookUrl}
          onChange={handleWebhookChange}
          className="w-full p-3 rounded-lg border border-gray-600 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white mb-2"
        />

        <button
          onClick={handleDelete}
          className="w-full bg-black text-white p-2 rounded-lg border border-gray-600 hover:bg-red-600 hover:border-red-700 transition flex items-center justify-center gap-2"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <LoaderIcon className="h-5 w-5 animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <>
              <Trash2Icon className="h-5 w-5" />
              <span>Delete Webhook</span>
            </>
          )}
        </button>

        <Footer/>
      </main>
    </div>
  );
}
