import { Trash2Icon, LoaderIcon } from "lucide-react";

// Components
import NotiBox from "@/components/NotificationBox";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

// Hooks
import useDeleteHandler from "@/hooks/useDeleteHandler";

export default function Home() {
  const deleteHandler = useDeleteHandler();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 bg-black text-white">
      {deleteHandler.message && (
        <NotiBox
          message={deleteHandler.message}
          status={deleteHandler.deleted ? "success" : "error"}
          onClose={() => deleteHandler.setMessage("")}
        />
      )}

      <Container>
        {/* Webhook URL */}
        <div className="mb-2">
          <label htmlFor="webhook-url" className="text-sm text-gray-400">
            Enter Discord Webhook URL
          </label>
          <input
            id="webhook-url"
            type="text"
            placeholder="Enter Discord Webhook URL"
            value={deleteHandler.webhookUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              deleteHandler.setWebhookUrl(e.target.value);
              deleteHandler.setDeleted(deleteHandler.deleted);
            }}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black text-white focus:outline-none focus:ring-1 focus:ring-white mb-2"
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={deleteHandler.handleDelete}
          className="w-full bg-black text-white p-2 rounded-lg border border-gray-600 hover:bg-red-600 hover:border-red-700 transition flex items-center justify-center gap-2"
          disabled={deleteHandler.isDeleting}
        >
          {deleteHandler.isDeleting ? (
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

        <Footer />
      </Container>
    </div>
  );
}
