import { motion } from "framer-motion";
import { AlertCircleIcon, Check, X, HelpCircle } from "lucide-react";

interface NotificationBoxProps {
  message: string;
  status: string;
  onClose: () => void;
  className?: string;
};

export default function NotificationBox({
  message,
  status,
  onClose,
  className = "",
}: NotificationBoxProps) {
  let statusIcon;
  let statusColor = "bg-gray-900/20";

  switch(status.toLowerCase()){
    case "success":
      statusIcon = <Check className="h-6 w-6 text-green-400 animate-pulse" />;
      statusColor = "border-green-600 bg-green-900/20 text-green-400";
      break;
    case "error":
      statusIcon = <AlertCircleIcon className="h-6 w-6 text-red-400 animate-pulse" />;
      statusColor = "border-red-600 bg-red-900/20 text-red-400";
      break;
    default:
      statusIcon = <HelpCircle className="h-6 w-6 text-blue-400 animate-pulse" />;
      statusColor = "border-blue-600 bg-blue-900/20 text-blue-400";
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`rounded-xl shadow-2xl backdrop-blur-lg gap-2 w-full p-3.5 flex items-center justify-between rounded border ${statusColor} mb-4 max-h-[90vh] overflow-y-auto 
        ${className.includes("max-w-") ? "" : "max-w-md"} ${className}`}
    >
      <div className="flex items-center gap-2 ">
        <span className="flex-shrink-0">{statusIcon}</span>
        <span className="text-sm break-words whitespace-pre-line">
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
    </motion.div>
  );
}
