require("dotenv").config();

const config = {
  database: {
    uri: process.env.MONGO_URI,
  },
  port: {
    port: process.env.PORT,
  },
  workast: {
    apiKey: process.env.WORKAST_API_KEY || "",
    apiUrl: process.env.WORKAST_API_URL || "https://api.workast.com/v1",
  },
  aiService: {
    endpoint: process.env.AI_SERVICE_ENDPOINT || "",
  },
  bot: {
    defaultChannelId: process.env.DEFAULT_CHANNEL_ID || "",
  },
  thresholds: {
    riskScore: Number(process.env.RISK_SCORE_THRESHOLD) || 7.0,
    workload: Number(process.env.WORKLOAD_THRESHOLD) || 15.0,
    reminderAdvanceMinutes: Number(process.env.REMINDER_ADVANCE_MINUTES) || 5,
  },
  api: {
    retryCount: Number(process.env.API_RETRY_COUNT) || 3,
    timeoutSeconds: Number(process.env.API_TIMEOUT_SECONDS) || 30,
  },
  circuitBreaker: {
    threshold: Number(process.env.CIRCUIT_BREAKER_THRESHOLD) || 0.5,
    windowMinutes: Number(process.env.CIRCUIT_BREAKER_WINDOW_MINUTES) || 5,
    cooldownMinutes: Number(process.env.CIRCUIT_BREAKER_COOLDOWN_MINUTES) || 2,
  },
};

module.exports = config;
