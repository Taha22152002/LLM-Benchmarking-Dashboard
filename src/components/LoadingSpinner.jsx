import { RefreshCw } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-48">
      <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
      <span className="ml-3 text-lg text-gray-600">Loading data...</span>
    </div>
  );
}
