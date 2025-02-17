import { Trash2Icon, LoaderIcon } from "lucide-react";

// Components
import NotiBox from "@/components/NotificationBox";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

// Hooks
import useDeleteHandler from "@/hooks/webhookDelete";

export default function Home() {
  const deleteHandler = useDeleteHandler();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 text-white">
      <title>CordUtils - Webhook killer 💀</title>
      {deleteHandler.message && (
        <NotiBox
          message={deleteHandler.message}
          status={deleteHandler.deleted ? "success" : "error"}
          onClose={() => deleteHandler.setMessage("")}
        />
      )}

      <Container>
        <div className="mb-2">
          <h1 className="text-xl font-bold mb-4">./webhook-delete</h1>
          <label htmlFor="webhook-url" className="text-sm text-gray-400">
            Discord Webhook URL
          </label>
          <input
            id="webhook-url"
            type="text"
            placeholder="Enter Webhook URL"
            value={deleteHandler.webhookUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              deleteHandler.setWebhookUrl(e.target.value);
              deleteHandler.setDeleted(deleteHandler.deleted);
            }}
            className="w-full p-3 rounded-lg border border-gray-600 bg-black/30 text-white focus:outline-none focus:ring-1 focus:ring-white mb-2 shadow-lg backdrop-blur-lg"
          />
        </div>


        <button
          onClick={deleteHandler.handleDelete}
          className="w-full bg-black/30 text-white p-2 rounded-lg border border-gray-600 hover:border-red-700 transition flex items-center justify-center gap-2 shadow-lg backdrop-blur-lg"
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

        {/* <Footer /> */}
      </Container>
    </div>
  );
}
