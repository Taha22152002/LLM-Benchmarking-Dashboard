import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_BASE = "https://artificialanalysis.ai/api/v2";
const API_KEY = process.env.ARTIFICIAL_ANALYSIS_API_KEY;

// Helper function
async function fetchFromAI(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "x-api-key": API_KEY },
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err.message);
    throw err;
  }
}

/* ---------- LLM MODELS ---------- */
app.get("/api/llms/models", async (req, res) => {
  try {
    const data = await fetchFromAI("/data/llms/models");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch LLM models" });
  }
});

/* ---------- TEXT-TO-IMAGE ---------- */
app.get("/api/media/text-to-image", async (req, res) => {
  try {
    const data = await fetchFromAI("/data/media/text-to-image");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch text-to-image models" });
  }
});

/* ---------- IMAGE EDITING ---------- */
app.get("/api/media/image-editing", async (req, res) => {
  try {
    const data = await fetchFromAI("/data/media/image-editing");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch image-editing models" });
  }
});

/* ---------- TEXT-TO-SPEECH ---------- */
app.get("/api/media/text-to-speech", async (req, res) => {
  try {
    const data = await fetchFromAI("/data/media/text-to-speech");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch text-to-speech models" });
  }
});

/* ---------- TEXT-TO-VIDEO ---------- */
app.get("/api/media/text-to-video", async (req, res) => {
  try {
    const data = await fetchFromAI("/data/media/text-to-video");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch text-to-video models" });
  }
});

/* ---------- IMAGE-TO-VIDEO ---------- */
app.get("/api/media/image-to-video", async (req, res) => {
  try {
    const data = await fetchFromAI("/data/media/image-to-video");
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch image-to-video models" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
