import { AlertCircleIcon, Check, X } from "lucide-react";

type NotificationBoxProps = {
  message: string;
  deleted: boolean;
  onClose: () => void;
};

export default function NotificationBox({
  message,
  deleted,
  onClose,
}: NotificationBoxProps) {
  return (
    <div className={`rounded-lg  gap-2 w-full max-w-md p-6 flex items-center justify-between rounded p-2.5 border ${deleted ? "border-green-600" : "border-red-600"} mb-4`}>
      <div className="flex items-center gap-2">
        {deleted ? (
          <Check className="h-5 w-5 text-green-600" />
        ) : (
          <AlertCircleIcon className="h-5 w-5 text-red-600" />
        )}
        <span className={`text-sm ${deleted ? "text-green-600" : "text-red-600"}`}>
          <span className="font-bold">{deleted?"Success":"Error"}: </span>{message}
        </span>

      </div>
      <button onClick={()=>{onClose();}} className="text-white">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
