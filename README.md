# 🪙 CryptoPulse

**CryptoPulse** is a real-time cryptocurrency analytics dashboard built with modern frontend technologies. It delivers live pricing data, interactive charts, and visual analytics for popular cryptocurrencies through a sleek and responsive single-page interface.

---

## 🚀 Overview

CryptoPulse is designed to display live updates, market stats, historical trends, and user interactions in a clean, user-friendly dashboard. It fetches data using **WebSocket** (for live prices) and **REST APIs** (for historical data).

---

## 🧰 Tech Stack

- **React + TypeScript**
- **Vite** (modern build tool)
- **WebSockets** (Kraken API)
- **REST API** (CoinCap.io)
- **Chart.js / Recharts** for visualizations
- **Tailwind CSS** or `styled-components` for styling

---

## 🔑 Core Features

- **Live Price Updates**  
  Real-time pricing via WebSocket for assets like Bitcoin, Ethereum, and Solana.

- **Interactive Dashboard**  
  Cards showing price, % change, volume, and market cap.

- **Dynamic Charts**  
  Line charts and sparklines for 24h/7d/30d trends.

- **Search, Sort & Filter**  
  Easily search and filter cryptocurrencies by name, market cap, etc.

- **Favorites Support**  
  Mark assets as favorites and store locally via `localStorage`.

- **Dark/Light Theme Toggle**  
  Theme context with persistent user preference.

- **Responsive Design**  
  Mobile-first layout with adaptive components and collapsible elements.

---

## 📡 Data Sources

- **WebSocket:**
  - [Kraken WebSocket API](https://docs.kraken.com/api/docs/websocket-v2/add_order)

- **REST:**
  - [CoinCap Assets](https://api.coincap.io/v2/assets)
  - [CoinCap History](https://api.coincap.io/v2/assets/:id/history)

---


## 🧩 Custom React Hooks

- `useWebSocketPrices`
- `useFetchAssetData`
- `useTheme`

All hooks include TypeScript typings and proper error handling.

---

## ✨ Optional Enhancements

- 🌍 i18n (English/Russian language toggle)
- 🧪 Unit testing with React Testing Library
- 🔐 Route protection (mock-only)
- ♿ Accessibility improvements

---

## 📘 Reference Links

### APIs
- https://docs.kraken.com/api/docs/guides/global-intro
- https://docs.coinapi.io/market-data/websocket-ds/general
- https://pro.coincap.io/api-docs

### Dashboard Examples
- https://www.livecoinwatch.com/
- https://cointracking.info/dashboard.php?language=en

### Charts
- [Recharts Custom Tooltip](https://recharts.org/en-US/examples/CustomContentOfTooltip)
- [Chart.js Samples](https://www.chartjs.org/docs/latest/samples/information.html)

---
