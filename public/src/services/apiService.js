// src/services/apiService.js
const BASE_URL = "http://localhost:3000/api"; // your proxy endpoint (prevents CORS)
const API_KEY = import.meta.env.VITE_ARTIFICIAL_ANALYSIS_KEY;

const apiService = {
  /** ────────────────────────────────
   *  LLM MODELS
   *  ──────────────────────────────── */
  getLLMModels: async () => {
    const res = await fetch(`${BASE_URL}/llms/models`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch LLM models");

    const json = await res.json();
    return json.data.map((m) => ({
      modelName: m.name || "Unknown",
      modelCreator: m.model_creator?.name || "Unknown",
      elo: m.evaluations?.artificial_analysis_intelligence_index || 0,
      coding: m.evaluations?.artificial_analysis_coding_index || 0,
      math: m.evaluations?.artificial_analysis_math_index || 0,
      mmlu: (m.evaluations?.mmlu_pro || 0) * 100,
      gpqa: (m.evaluations?.gpqa || 0) * 100,
      hle: (m.evaluations?.hle || 0) * 100,
      humaneval: (m.evaluations?.livecodebench || 0) * 100,
      scicode: (m.evaluations?.scicode || 0) * 100,
      math500: (m.evaluations?.math_500 || 0) * 100,
      aime: (m.evaluations?.aime || 0) * 100,
      price_input: m.pricing?.price_1m_input_tokens || 0,
      price_output: m.pricing?.price_1m_output_tokens || 0,
      price_blended: m.pricing?.price_1m_blended_3_to_1 || 0,
      tps: m.median_output_tokens_per_second || 0,
      ttft: m.median_time_to_first_token_seconds || 0,
      efficiency:
        m.pricing?.price_1m_blended_3_to_1 > 0
          ? m.evaluations?.artificial_analysis_intelligence_index /
            m.pricing?.price_1m_blended_3_to_1
          : 0,
    }));
  },

  /** ────────────────────────────────
   *  TEXT → IMAGE MODELS
   *  ──────────────────────────────── */
  getTextToImage: async () => {
    const res = await fetch(`${BASE_URL}/media/text-to-image`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch Text-to-Image data");

    const json = await res.json();
    return json.data.map((m) => ({
      id: m.id,
      name: m.name || "Unknown",
      modelCreator: m.model_creator?.name || "Unknown",
      elo: m.elo || 0,
      rank: m.rank || "-",
      ci95: m.ci95 || "",
      categories: m.categories || [],
    }));
  },

  /** ────────────────────────────────
   *  IMAGE EDITING
   *  ──────────────────────────────── */
  getImageEditing: async () => {
    const res = await fetch(`${BASE_URL}/media/image-editing`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch Image Editing data");

    const json = await res.json();
    return json.data.map((m) => ({
      id: m.id,
      name: m.name || "Unknown",
      modelCreator: m.model_creator?.name || "Unknown",
      elo: m.elo || 0,
      rank: m.rank || "-",
      ci95: m.ci95 || "",
      categories: m.categories || [],
    }));
  },

  /** ────────────────────────────────
   *  TEXT → SPEECH
   *  ──────────────────────────────── */
  getTextToSpeech: async () => {
    const res = await fetch(`${BASE_URL}/media/text-to-speech`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch Text-to-Speech data");

    const json = await res.json();
    return json.data.map((m) => ({
      id: m.id,
      name: m.name || "Unknown",
      modelCreator: m.model_creator?.name || "Unknown",
      elo: m.elo || 0,
      rank: m.rank || "-",
      ci95: m.ci95 || "",
      categories: m.categories || [],
    }));
  },

  /** ────────────────────────────────
   *  TEXT → VIDEO
   *  ──────────────────────────────── */
  getTextToVideo: async () => {
    const res = await fetch(`${BASE_URL}/media/text-to-video`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch Text-to-Video data");

    const json = await res.json();
    return json.data.map((m) => ({
      id: m.id,
      name: m.name || "Unknown",
      modelCreator: m.model_creator?.name || "Unknown",
      elo: m.elo || 0,
      rank: m.rank || "-",
      ci95: m.ci95 || "",
      categories: m.categories || [],
    }));
  },

  /** ────────────────────────────────
   *  IMAGE → VIDEO
   *  ──────────────────────────────── */
  getImageToVideo: async () => {
    const res = await fetch(`${BASE_URL}/media/image-to-video`, {
      headers: { "x-api-key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch Image-to-Video data");

    const json = await res.json();
    return json.data.map((m) => ({
      id: m.id,
      name: m.name || "Unknown",
      modelCreator: m.model_creator?.name || "Unknown",
      elo: m.elo || 0,
      rank: m.rank || "-",
      ci95: m.ci95 || "",
      categories: m.categories || [],
    }));
  },
};

export default apiService;
