import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const port = 4000;

const OPENF1_BASE = "https://api.openf1.org/v1";

app.get("/api/drivers", async (req, res) => {
  const url = `${OPENF1_BASE}/drivers?session_key=latest`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.get("/api/driver/:number", async (req, res) => {
  const number = req.params.number;
  const url = `${OPENF1_BASE}/drivers?driver_number=${number}&session_key=latest`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data[0] || null);
});

app.listen(port, () => {
  console.log("http://localhost:4000");
});
