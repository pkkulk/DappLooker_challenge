# 🧠 DappInsight Backend

AI-powered backend for the **DappLooker Full Stack Engineer Assignment**.

This backend integrates **real-time crypto market data** from [CoinGecko API](https://www.coingecko.com/en/api) and **wallet PnL data** from [HyperLiquid API](https://hyperliquid.xyz/), enhanced with **AI insights** generated via **Google Gemini (2.0 Flash)**.

It is **Dockerized** for easy deployment and includes mock JSON data for offline reliability.

---

## ⚙️ Environment Setup

Before running the backend (either locally or with Docker), create a `.env` file in the project root:

```bash
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
```

> 💡 You can generate a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

Include a `.env.example` file in your repo (without real keys) for reference.

---

## 🐳 Run with Docker (Preferred)

This is the **recommended** method to run the backend, as per DappLooker’s instructions.

### 1️⃣ Build the Docker image

```bash
docker build -t dappinsight-backend .
```

### 2️⃣ Run the container

```bash
docker run -d -p 5000:5000 --env-file .env dappinsight-backend
```

Your backend will be available at:

```
http://localhost:5000
```

### 3️⃣ Stop the container

```bash
docker ps
docker stop <container_id>
```

(Optional) Remove the container:

```bash
docker rm <container_id>
```

---

## ⚙️ Local Setup (Alternative)

If you prefer to run the project locally without Docker:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/dappinsight-backend.git
cd dappinsight-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add your `.env` file

```
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4️⃣ Run in development mode

```bash
npm run dev
```

Your app will be live at:

```
http://localhost:5000
```

---

## 💡 API Endpoints

### 🪙 Task 1 — Token Insight API

**POST**

```
http://localhost:5000/api/token/bitcoin/insight
```

**Request Body**

```json
{
  "vs_currency": "usd",
  "history_days": 30
}
```

**Example Response**

```json
{
  "source": "coingecko",
  "token": {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "market_data": {
      "current_price_usd": 101964,
      "market_cap_usd": 2032452162518,
      "total_volume_usd": 78656020517,
      "price_change_percentage_24h": 2.17806
    }
  },
  "insight": {
    "reasoning": "A positive 24h change of 2.17% indicates bullish market sentiment.",
    "sentiment": "Bullish"
  },
  "model": {
    "provider": "google-gemini",
    "model": "gemini-2.0-flash"
  }
}
```

---

### 💰 Task 2 — HyperLiquid Wallet PnL API

**GET**

```
http://localhost:5000/api/hyperliquid/0x19f03256cf9e42105f424dbb99e5e00d5f1e9f1d/pnl?start=2025-11-01&end=2025-11-05
```

**Example Response**

```json
{
  "wallet": "0x19f03256cf9e42105f424dbb99e5e00d5f1e9f1d",
  "start": "2025-11-01",
  "end": "2025-11-05",
  "daily": [
    { "date": "2025-11-01", "net_pnl_usd": 102.6 },
    { "date": "2025-11-02", "net_pnl_usd": -11.5 },
    { "date": "2025-11-03", "net_pnl_usd": 78.0 },
    { "date": "2025-11-04", "net_pnl_usd": 44.4 },
    { "date": "2025-11-05", "net_pnl_usd": -22.3 }
  ],
  "summary": {
    "total_realized_usd": 175.5,
    "total_unrealized_usd": 24.9,
    "net_pnl_usd": 191.2
  },
  "diagnostics": {
    "data_source": "hyperliquid_api"
  }
}
```

---

## 🧾 Environment Variables

| Variable         | Description                                |
| ---------------- | ------------------------------------------ |
| `PORT`           | Port number (default: 5000)                |
| `GEMINI_API_KEY` | Your Google Gemini API key for AI analysis |

📄 Example `.env.example`

```
PORT=5000
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxx
```

---

## 🧠 Features

| Feature               | Description                                   |
| --------------------- | --------------------------------------------- |
| 🌐 REST APIs          | Built with Express.js                         |
| 🤖 AI Analysis        | Google Gemini 2.0 Flash for insights          |
| 💹 Live Crypto Data   | Real-time from CoinGecko                      |
| 💰 Wallet PnL Summary | From HyperLiquid API (mocked for reliability) |
| 🐳 Dockerized         | Production-ready backend                      |
| 🧠 Modular Code       | Controllers, Routes, Utils structure          |

---

## 🧩 Project Commands

| Command                                               | Description 
| `npm run dev`                                         | Start in dev mode with nodemon |
| `npm start`                                           | Run in production mode         |
| `docker build -t dappinsight-backend .`               | Build Docker image             |
| `docker run -p 5000:5000 --env-file .env dappinsight-backend` | Run Docker  container       |


## 🧱 Project Flow

1️⃣ User sends request for token or wallet data.
2️⃣ Backend fetches data from CoinGecko / HyperLiquid.
3️⃣ Gemini analyzes trends and returns insight.
4️⃣ API responds with clean JSON (token metrics + AI summary).

---

## 🔒 Notes

* `.env` file is excluded from GitHub for security.
* `.env.example` provided for setup reference.
* Docker image uses `node:20-alpine` for lightweight builds.
* Works offline using mock data in `/data` folder.

---

## ✨ Author

**👨‍💻 Prathamesh Kulkarni**
B.E. Artificial Intelligence & Data Science
📧 [prathmeshkulkarni312@gmail.com](mailto:prathmeshkulkarni312@gmail.com)
🔗 [GitHub](https://github.com/pkkulk)

---

