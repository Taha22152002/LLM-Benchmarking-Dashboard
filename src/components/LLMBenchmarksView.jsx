import React from "react";
import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { ArrowUp, ArrowDown } from "lucide-react";

const getSortIcon = (key, sortConfig) => {
  if (sortConfig.key !== key) return null;
  return sortConfig.direction === "asc" ? (
    <ArrowUp className="w-3 h-3 ml-1 inline" />
  ) : (
    <ArrowDown className="w-3 h-3 ml-1 inline" />
  );
};

export default function LLMBenchmarksView({
  loading,
  error,
  sortConfig,
  handleSort,
  sortedData,
}) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 border-indigo-100">
        LLM Benchmarks: Performance, Pricing, & Speed Metrics
      </h2>

      {/* Chart Section */}
      <div className="rounded-2xl shadow-lg p-6 bg-white border border-gray-100 mb-10">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">
          Performance: MMLU vs HumanEval
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="mmlu" name="MMLU" />
            <YAxis type="number" dataKey="humaneval" name="HumanEval" />
            <ZAxis dataKey="elo" range={[100, 400]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md text-sm">
                      <p className="font-semibold text-gray-800">{d.modelName}</p>
                      <p>MMLU: {d.mmlu.toFixed(1)}%</p>
                      <p>HumanEval: {d.humaneval.toFixed(1)}%</p>
                      <p>ELO: {d.elo.toFixed(1)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Scatter data={sortedData} fill="#4f46e5" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-2xl shadow-lg bg-white border-gray-200">
        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100">
          <table className="min-w-full">
            <thead className="bg-indigo-100/80 sticky top-0 z-10">
              <tr>
                {[
                  { key: "modelName", name: "Model" },
                  { key: "modelCreator", name: "Creator" },
                  { key: "elo", name: "ELO" },
                  { key: "mmlu", name: "MMLU (%)" },
                  { key: "humaneval", name: "HumanEval (%)" },
                  { key: "gpqa", name: "GPQA (%)" },
                  { key: "math", name: "Math Index" },
                  { key: "price_input", name: "Input ($/1M)" },
                  { key: "price_output", name: "Output ($/1M)" },
                  { key: "price_blended", name: "Blended ($/1M)" },
                  { key: "tps", name: "Tokens/sec" },
                  { key: "ttft", name: "TTFT (s)" },
                  { key: "efficiency", name: "Efficiency (ELO/$)" },
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.modelName}</td>
                  <td className="px-4 py-3 text-sm">{item.modelCreator}</td>
                  <td className="px-4 py-3 text-sm font-bold text-indigo-600">{item.elo.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">{item.mmlu.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">{item.humaneval.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">{item.gpqa.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">{item.math.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">${item.price_input.toFixed(3)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">${item.price_output.toFixed(3)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">${item.price_blended.toFixed(3)}</td>
                  <td className="px-4 py-3 text-sm">{item.tps.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">{item.ttft.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                    {item.efficiency.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
