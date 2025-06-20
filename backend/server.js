// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getWebSocketToken } = require("./kraken");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/token", (req, res) => {
    getWebSocketToken()
        .then((response) => {
            if (response.error && response.error.length > 0) {
                throw new Error(response.error.join(", "));
            }
            res.json({ token: response.result.token });
        })
        .catch((err) => {
            console.error("Error getting WebSocket token:", err);
            res.status(500).json({ error: err.message });
        });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Backend запущен на http://localhost:${PORT}`);
});
