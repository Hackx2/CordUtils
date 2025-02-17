import axios from "axios";

import { useState } from "react";
import { validateUrl } from "@/utils/webhookUtils";

export const WebhookLookup = () => {
    const [webhookUrl, setWebhookUrl] = useState("");
    const [webhookData, setWebhookData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showRaw, setShowRaw] = useState(false);
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("error");

    const fetchWebhookData = async () => {
        const validationError = validateUrl(webhookUrl);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setWebhookData(null);

        try {
            const response = await axios.get(webhookUrl);
            setWebhookData(response.data);
            setErrorType("info");
            setError("Successfully grabbed data");
        } catch (err) {
            setErrorType("error");
            setError("Failed to fetch webhook info. Check the URL.");
        }
        setLoading(false);
    };

    return {
        webhookUrl,
        setWebhookUrl,
        webhookData,
        loading,
        showRaw,
        setShowRaw,
        error,
        setError,
        errorType,
        fetchWebhookData,
    };
};
