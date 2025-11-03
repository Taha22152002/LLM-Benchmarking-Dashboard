import { XCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center h-48 bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
      <XCircle className="w-6 h-6 text-red-500 mr-3" />
      <span className="text-red-700 font-medium">{message}</span>
    </div>
  );
}
