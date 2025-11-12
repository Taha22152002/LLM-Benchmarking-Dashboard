import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

const getSortIcon = (key, sortConfig) => {
  if (sortConfig.key !== key) return null;
  return sortConfig.direction === "asc" ? (
    <ArrowUp className="w-3 h-3 ml-1 inline" />
  ) : (
    <ArrowDown className="w-3 h-3 ml-1 inline" />
  );
};

export default function ImageToVideoView({ loading, error, sortConfig, handleSort, sortedData }) {
  if (loading)
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        Loading Image-to-Video models...
      </p>
    );

  if (error)
    return <p className="text-center text-red-500 py-10 text-lg">{error}</p>;

  if (!sortedData?.length)
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        No Image-to-Video data available.
      </p>
    );

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 border-indigo-100">
        Image-to-Video Models — ELO Rankings
      </h2>

      <div className="overflow-x-auto border rounded-2xl shadow-lg bg-white border-gray-200">
        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100">
          <table className="min-w-full">
            <thead className="bg-indigo-100/80 sticky top-0 z-10">
              <tr>
                {[
                  { key: "name", name: "Model" },
                  { key: "modelCreator", name: "Creator" },
                  { key: "elo", name: "ELO" },
                  { key: "rank", name: "Rank" },
                  { key: "ci95", name: "CI 95%" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase text-indigo-700 cursor-pointer hover:bg-indigo-200"
                  >
                    {col.name}
                    {getSortIcon(col.key, sortConfig)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedData.map((item, i) => (
                <motion.tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-indigo-50/50"}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.modelCreator}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-indigo-600">{item.elo}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.rank}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.ci95}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
