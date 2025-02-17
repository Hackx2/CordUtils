import { LoaderIcon, EyeIcon, EyeOffIcon, RefreshCcw } from "lucide-react";
import Container from "@/components/Container";
import NotiBox from "@/components/NotificationBox";
import Footer from "@/components/Footer";
import { WebhookLookup } from "@/hooks/webhookLookup";

export default function WebhookInfo() {
    const hook = WebhookLookup();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 text-white">
            <title>CordUtils - Webhook Look-Up 🔎</title>

            {hook.error && (
                <NotiBox className="max-w-[1000px]" message={hook.error} status={hook.errorType} onClose={() => hook.setError("")} />
            )}

            <Container className="max-w-[1100px] p-6 rounded-lg border border-gray-600 shadow-lg backdrop-blur-lg">
                <h1 className="text-xl font-bold mb-4">./webhook-lookup</h1>

                <label htmlFor="webhook-url" className="text-sm text-gray-400">
                    Discord Webhook URL
                </label>
                <input
                    id="webhook-url"
                    type="text"
                    placeholder="Enter Webhook URL"
                    value={hook.webhookUrl}
                    onChange={(e) => hook.setWebhookUrl(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-600 bg-black/30 text-white focus:outline-none focus:ring-1 focus:ring-white mb-4 shadow-lg backdrop-blur-lg"
                />

                <button
                    onClick={hook.fetchWebhookData}
                    className="w-full bg-black/30 text-white p-2 rounded-lg border border-gray-600 hover:border-white transition flex items-center justify-center gap-2 shadow-lg backdrop-blur-lg"
                    disabled={hook.loading}
                >
                    {hook.loading ? <LoaderIcon className="h-5 w-5 animate-spin" /> : <><RefreshCcw className="w-5 h-5"/> Fetch Data</>}
                </button>

                {hook.webhookData && (
                    <div className="mt-6 p-4 w-full bg-black/30 rounded-lg border border-gray-600 shadow-lg backdrop-blur-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg">Webhook data:</h2>
                            <button
                                onClick={() => hook.setShowRaw(!hook.showRaw)}
                                className="text-white bg-black/30 hover:text-gray-300 transition-all flex items-center gap-1 shadow-lg backdrop-blur-lg"
                            >
                                {hook.showRaw ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                {hook.showRaw ? "Hide Raw Data" : "Show Raw Data"}
                            </button>
                        </div>

                        {hook.showRaw ? (
                            <pre className="overflow-auto max-h-64 w-full p-2 bg-black/30 text-sm rounded-lg border border-gray-500 shadow-lg backdrop-blur-lg">
                                {JSON.stringify(hook.webhookData, null, 2)}
                            </pre>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 w-full max-w-[2000px]">
                                <div className="p-2 bg-black/30 rounded-lg border border-gray-500 overflow-hidden">
                                    <p className="break-words"><span className="font-bold">Type:</span> {hook.webhookData.type || 0}</p>
                                </div>
                                <div className="p-2 bg-black/30 rounded-lg border border-gray-500 overflow-hidden">
                                    <p className="break-words"><span className="font-bold">Name:</span> {hook.webhookData.name}</p>
                                </div>
                                <div className="p-2 bg-black/30 rounded-lg border border-gray-500 overflow-hidden">
                                    <p className="break-words"><span className="font-bold">ID:</span> {hook.webhookData.id}</p>
                                </div>
                                <div className="p-2 bg-black/30 rounded-lg border border-gray-500 overflow-hidden">
                                    <p className="break-words"><span className="font-bold">Channel ID:</span> {hook.webhookData.channel_id}</p>
                                </div>
                                <div className="p-2 bg-black/30 rounded-lg border border-gray-500 overflow-hidden">
                                    <p className="break-words"><span className="font-bold">Guild ID:</span> {hook.webhookData.guild_id || "N/A"}</p>
                                </div>
                                <div className="p-2 bg-black/30 rounded-lg border border-gray-500 overflow-hidden">
                                    <p className="break-words"><span className="font-bold">Token:</span> {hook.webhookData.token || "undefined"}</p>
                                </div>
                            </div>

                        )}
                    </div>
                )}
                {/* <Footer /> */}
            </Container>
        </div>
    );
}
