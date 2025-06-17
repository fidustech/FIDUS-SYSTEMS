const cors = require('cors');
app.use(cors());
const express = require('express');
const app = express();
app.use(express.json());

// Minimal test endpoint for diagnostics
app.get('/api/test', (req, res) => res.json({ status: 'test ok' }));

// Example API endpoint: /api/dashboard
app.get('/api/dashboard', (req, res) => {
  res.json({
    totalFunds: 12,
    activePositions: 8,
    totalValue: 2847500,
    dailyPL: 12450,
    recentTrades: [
      { id: 1, symbol: "BTCUSD", type: "buy", qty: 2, price: 67000 },
      { id: 2, symbol: "ETHUSD", type: "sell", qty: 5, price: 3700 }
    ],
    topPerformers: [
      { symbol: "BTCUSD", profit: 10000 },
      { symbol: "ETHUSD", profit: 5000 }
    ]
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Listen on the port Render expects
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
