# 🚀 LLM Benchmarking Dashboard

### Powered by Artificial Analysis & Node.js

This is a custom-built dashboard application designed to provide **real-time, independent performance and quality metrics** for leading Large Language Models (LLMs) and Multimodal models. It aggregates and presents data directly from the **Artificial Analysis API**, giving users a clear, comparative view of model intelligence, speed, and cost efficiency.

-----

## ✨ Features

  * **Real-time Data:** Fetches the latest benchmarking data for various models directly from the `artificialanalysis.ai` API.
  * **Comprehensive Metrics:** Displays critical performance metrics, including intelligence scores, latency, tokens-per-second, and pricing.
  * **Modular Endpoints:** Organized API structure to fetch data for specific model categories:
      * Language Models (`/api/llms/models`)
      * Text-to-Image / Image Editing (`/api/media/...`)
      * Text-to-Speech / Text-to-Video (`/api/media/...`)
  * **API Resilience:** Implements an `AbortController` with an extended timeout to gracefully handle periods of high latency or temporary unavailability from the external API (addressing the recent connectivity issues).
  * **Simple Stack:** Built on a reliable Node.js/Express backend with a lightweight custom JavaScript/HTML/CSS frontend.

-----

## ⚙️ Installation & Setup

### Prerequisites

  * **Node.js** (LTS recommended)
  * **Artificial Analysis API Key:** Obtain a key from the [Artificial Analysis Insights Platform](https://artificialanalysis.ai/documentation).

### 1\. Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone [YOUR_REPO_URL]
    cd Custom-AI-Dashboard
    ```

2.  **Install dependencies:**

    ```bash
    npm install express node-fetch cors dotenv
    ```

3.  **Create `.env` file:**
    In the root of the project directory, create a file named **`.env`** and add your API key:

    ```
    # .env
    ARTIFICIAL_ANALYSIS_API_KEY="aa_YOUR_SECRET_API_KEY_HERE"
    ```

4.  **Start the server:**

    ```bash
    cd server/model
    node server.js
    ```

    The server will run on `http://localhost:3000`.

### 2\. Frontend Setup

The frontend is a static application located in the `public/` folder (or wherever your frontend files are located).

1.  Open the frontend entry file (e.g., `public/index.html` or equivalent) in your web browser.
2.  Ensure the frontend code is correctly configured to fetch data from the running backend at `http://localhost:3000/api/llms/models` and other relevant endpoints.

Or simply:

```bash
    npm run dev
    ```

-----

## 📄 API Endpoints

The Node.js server exposes the following endpoints, which your frontend consumes:

| Endpoint | Data Fetched |
| :--- | :--- |
| `/api/llms/models` | General Language Model (LLM) benchmarks. |
| `/api/media/text-to-image` | Text-to-Image model performance. |
| `/api/media/image-editing` | Image Editing model performance. |
| `/api/media/text-to-speech` | Text-to-Speech model performance. |
| `/api/media/text-to-video` | Text-to-Video model performance. |
| `/api/media/image-to-video` | Image-to-Video model performance. |

-----

## 💡 Troubleshooting & Resilience

The backend is configured to include a **15-second connection timeout** using the `AbortController`. This helps prevent application crashes during periods when the external API is slow or temporarily down (as was recently confirmed via `curl` tests).

If you still encounter connection errors:

1.  **Check API Key:** Double-check that `ARTIFICIAL_ANALYSIS_API_KEY` in your `.env` file is correct and active.
2.  **Test External Reachability:** Use a direct `curl` command to verify the API is online from your machine:
    ```bash
    curl -v -H "x-api-key: YOUR_KEY" https://artificialanalysis.ai/api/v2/data/llms/models
    ```
3.  **Rate Limits:** Ensure you have not exceeded the limits on your free or commercial API tier.

-----

## 🤝 Contribution

[Optional: If this is an open-source project, include a section here detailing how others can contribute, report bugs, or suggest features.]

-----

## ⚖️ License

[Optional: Specify the license, e.g., MIT License.]