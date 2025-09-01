import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("server is live");
});

await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});