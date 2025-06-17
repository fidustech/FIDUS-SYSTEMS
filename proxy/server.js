const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/api/dashboard', (req, res) => {
  res.json({
    status: "success",
    timestamp: new Date().toISOString(),
     {
      fundOverview: {
        totalFundValue: 1910082695,
        totalUsers: 37,
        corporateUsers: 11,
        individualUsers: 26,
        last12MonthPerformance: 29.26,
        dailyPerformance: {
          percent: 2.18,
          value: 41639802.35
        },
        monthlyPerformance: {
          percent: 0.00,
          value: 0
        }
      },
      financialBreakdown: {
        deposits: {
          total: 1910260929.72,
          individual: 4751326.15,
          corporate: 1904369171.33
        },
        withdrawals: {
          total: 563755752.49,
          individual: 848312.89,
          corporate: 563327701.98
        },
        performance: {
          total: 164551921.66,
          individual: 622462.49,
          corporate: 163929257.46
        },
        revenue: {
          total: 1346505177.23,
          individual: 3903013.26,
          corporate: 1341041469.35
        }
      },
      tradingPositions: {
        currentStrategies: {
          count: 36,
          totalPnL: 150000000,
          totalMargin: 460000000,
          btcPositions: 34,
          otherPositions: 2,
          winningPositions: 22,
          losingPositions: 12
        },
        hedgingStrategies: {
          count: 6,
          totalCapitalUsed: 375000000,
          riskLevel: "Low",
          armedTriggers: 8
        }
      },
      capitalAllocation: {
        trading: {
          allocated: 460000000,
          percentage: 24.1
        },
        hedging: {
          allocated: 375000000,
          percentage: 19.6
        },
        liquid: {
          allocated: 1074582695,
          percentage: 56.3
        }
      },
      geographicDistribution: [
        {
          name: "London / BVI - United Kingdom",
          percentage: 35,
          color: "blue"
        },
        {
          name: "Estonia / Italy - Europe",
          percentage: 30,
          color: "green"
        },
        {
          name: "Brazil",
          percentage: 25,
          color: "purple"
        },
        {
          name: "Other",
          percentage: 10,
          color: "orange"
        }
      ],
      livePrices: {
        BTC: {
          price: 108750.00,
          change24h: -1.89,
          volume24h: 31600000000,
          marketCap: 2140000000000
        },
        ETH: {
          price: 3850.75,
          change24h: 1.25,
          volume24h: 12000000000,
          marketCap: 462000000000
        },
        LINK: {
          price: 27.80,
          change24h: -0.85,
          volume24h: 800000000,
          marketCap: 15290000000
        }
      },
      recentPerformance: {
        june2025: {
          totalReturn: 2.18,
          averageDaily: 0.22,
          bestDay: 1.41,
          worstDay: -1.09,
          tradingDays: 10
        }
      },
      securityStatus: {
        level: "High",
        twoFactorEnabled: true,
        allowedIPs: 6,
        activeAPIKeys: 4,
        systemStatus: "Operational"
      },
      auditCompliance: {
        complianceScore: 97.2,
        activeLicenses: 4,
        jurisdictions: [
          "Estonia",
          "United Kingdom",
          "British Virgin Islands",
          "Brazil"
        ],
        lastAudit: "2024-11-25",
        nextAudit: "2025-01-15"
      }
    },
    meta: {
      version: "2.1.4",
      source: "Fiddux Fund Trading Management Platform",
      updateFrequency: "real-time",
      lastDataUpdate: new Date().toISOString(),
      endpoints: {
        documentation: "/api/docs",
        health: "/api/health"
      }
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
