import React from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

const getSortIcon = (key, sortConfig) => {
  if (sortConfig.key !== key) return null;
  return sortConfig.direction === "asc" ? (
    <ArrowUp className="w-3 h-3 ml-1 inline" />
  ) : (
    <ArrowDown className="w-3 h-3 ml-1 inline" />
  );
};

export default function TextToImageView({ loading, error, sortConfig, handleSort, sortedData }) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 border-indigo-100">
        🖼️ Text-to-Image Model ELO Rankings
      </h2>

      {/* Chart */}
      <div className="rounded-2xl shadow-lg p-6 bg-white border border-gray-100 mb-10">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">
          Global ELO Ratings (Higher = Better)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedData.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="elo" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-2xl shadow-lg bg-white border-gray-200">
        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100">
          <table className="min-w-full">
            <thead className="bg-indigo-100/80 sticky top-0 z-10">
              <tr>
                {[
                  { key: "rank", name: "Rank" },
                  { key: "name", name: "Model" },
                  { key: "modelCreator", name: "Creator" },
                  { key: "elo", name: "ELO" },
                  { key: "ci95", name: "Confidence Interval" },
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
                  <td className="px-4 py-3 text-sm font-bold text-indigo-700">{item.rank}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm">{item.modelCreator}</td>
                  <td className="px-4 py-3 text-sm text-indigo-600 font-semibold">{item.elo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.ci95}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
