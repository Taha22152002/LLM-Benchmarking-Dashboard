import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import LLMBenchmarksView from "./components/LLMBenchmarksView";
import TextToImageView from "./components/TextToImageView";
import TextToSpeechView from "./components/TextToSpeechView";
import ImageEditingView from "./components/ImageEditingView";
import TextToVideoView from "./components/TextToVideoView";
import ImageToVideoView from "./components/ImageToVideoView";



import apiService from "./services/apiService";

const sortData = (data, sortConfig) => {
  if (!data || !sortConfig?.key) return data;
  return [...data].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === "string") {
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
  });
};

export default function App() {
  const [activeView, setActiveView] = useState("LLMs");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "elo", direction: "desc" });

  const views = [
    "LLMs",
    "Text-to-Image",
    "Image Editing",
    "Text-to-Speech",
    "Text-to-Video",
    "Image-to-Video",
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let fetched = [];
      switch (activeView) {
        case "LLMs":
          fetched = await apiService.getLLMModels();
          break;
        case "Text-to-Image":
          fetched = await apiService.getTextToImage();
          break;
        case "Image Editing":
          fetched = await apiService.getImageEditing();
          break;
        case "Text-to-Speech":
          fetched = await apiService.getTextToSpeech();
          break;
        case "Text-to-Video":
          fetched = await apiService.getTextToVideo();
          break;
        case "Image-to-Video":
          fetched = await apiService.getImageToVideo();
          break;
        default:
          fetched = [];
      }
      setData(fetched);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err.message || "Failed to fetch from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeView]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const sortedData = useMemo(() => sortData(data, sortConfig), [data, sortConfig]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-10 font-sans">
      <div className="container mx-auto px-6 max-w-7xl space-y-8">
        {/* HEADER */}
        <motion.header
          className="text-center bg-white rounded-2xl shadow-lg p-8 border-t-4 border-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
            AI Model Pricing & Performance Dashboard
          </h1>
          <p className="text-gray-600">
            Live model data powered by{" "}
            <a
              href="https://artificialanalysis.ai/"
              target="_blank"
              rel="noreferrer"
              className="underline text-indigo-600"
            >
              Artificial Analysis
            </a>
          </p>
        </motion.header>

        {/* NAV BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-5 py-2 rounded-full text-sm font-medium shadow transition-all ${
                activeView === view
                  ? "bg-indigo-600 text-white scale-105"
                  : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        {/* MAIN PANEL */}
<main className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
  {activeView === "Image-to-Video" ? (
  <ImageToVideoView
    loading={loading}
    error={error}
    sortConfig={sortConfig}
    handleSort={handleSort}
    sortedData={sortedData}
  />
  ) :
  activeView === "Text-to-Video" ? (
  <TextToVideoView
    loading={loading}
    error={error}
    sortConfig={sortConfig}
    handleSort={handleSort}
    sortedData={sortedData}
  />
) :
  activeView === "Text-to-Speech" ? (
  <TextToSpeechView
    loading={loading}
    error={error}
    sortConfig={sortConfig}
    handleSort={handleSort}
    sortedData={sortedData}
  />
) :
  activeView === "LLMs" ? (
    <LLMBenchmarksView
      loading={loading}
      error={error}
      sortConfig={sortConfig}
      handleSort={handleSort}
      sortedData={sortedData}
    />
  ) : activeView === "Text-to-Image" ? (
    <TextToImageView
      loading={loading}
      error={error}
      sortConfig={sortConfig}
      handleSort={handleSort}
      sortedData={sortedData}
    />
  ) : activeView === "Image Editing" ? (
    <ImageEditingView
      loading={loading}
      error={error}
      sortConfig={sortConfig}
      handleSort={handleSort}
      sortedData={sortedData}
    />
  ) : (
    <p className="text-center text-gray-500 py-40">
      Coming soon: {activeView} data view 🚀
    </p>
  )}
</main>

      </div>
    </div>
  );
}
