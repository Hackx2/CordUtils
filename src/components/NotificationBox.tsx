import { AlertCircleIcon, Check, X, HelpCircle } from "lucide-react";

type NotificationBoxProps = {
  message: string;
  status: string;
  onClose: () => void;
};

export default function NotificationBox({
  message,
  status,
  onClose,
}: NotificationBoxProps) {
  let statusIcon;
  let statusColor = "bg-gray-900/20";

  if (status.toLowerCase() === "success") {
    statusIcon = <Check className="h-6 w-6 text-green-400 animate-pulse" />;
    statusColor = "border-green-600 bg-green-900/20 text-green-400";
  } else if (status.toLowerCase() === "error") {
    statusIcon = <AlertCircleIcon className="h-6 w-6 text-red-400 animate-pulse" />;
    statusColor = "border-red-600 bg-red-900/20 text-red-400";
  } else {
    statusIcon = <HelpCircle className="h-6 w-6 text-blue-400 animate-pulse" />;
    statusColor = "border-blue-600 bg-blue-900/20 text-blue-400";
  }

  return (
    <div
      className={`rounded-xl shadow-2xl backdrop-blur-lg gap-2 w-full max-w-md p-3.5 flex items-center justify-between rounded border ${statusColor} mb-4`}
    >
      <div className="flex items-center gap-2">
        {statusIcon}
        <span className={`text-sm ${statusColor}`}>
          <span className="font-bold">{status.charAt(0).toUpperCase() + status.slice(1)}: </span>
          {message}
        </span>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-300 transition-all transform hover:rotate-12 active:scale-90"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
