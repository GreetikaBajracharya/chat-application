import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "4mb"}));
app.use(cors());

app.use("/api/status", (req, res) => {res.send("server is live");}) ;

app.use("/api/auth", userRoutes);

await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});