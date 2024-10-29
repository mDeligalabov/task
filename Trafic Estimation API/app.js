import express from "express";
import morgan from "morgan";
import { loadAndTransformAllData } from "./dataInjest.js";
import { calculateEstimation } from "./trafficEstimator.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan(":method :url :status :response-time ms"));

const ACCEPTED_CRITERIA_KEYS = [
  "countries",
  "browsernames",
  "platformnames",
  "vertical",
];

const validateBody = (body) => {
  for (const key in body.criteria) {
    if (!ACCEPTED_CRITERIA_KEYS.includes(key)) {
      throw Error(`Criteria key "${key}" is not an allowed criteria`);
    }

    if (!Array.isArray(body.criteria[key])) {
      throw Error(`Criteria key "${key}" must be list oof strings`);
    }
  }

  if (isNaN(body.totalRequestCount)) {
    throw Error(`"totalRequestCount" must be a number.`);
  }

  return;
};

// Get traffic estimation
app.post("/estimate", (req, res) => {
  try {
    validateBody(req.body);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }

  const criteria = req.body.criteria ?? {};

  const totalRequestCount = req.body.totalRequestCount;

  const estimation = calculateEstimation(criteria, totalRequestCount, data);

  return res.json({ estimatedTraffic: estimation });
});

// Load data and start server
let data;
try {
  data = await loadAndTransformAllData();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on("SIGINT", async () => {
    console.log(`\nReceived SIGINT. Waiting for API to close connections...`);

    await server.close();
    process.exit(0);
  });
} catch (error) {
  console.error("Failed to load data and start server:", error);
}
