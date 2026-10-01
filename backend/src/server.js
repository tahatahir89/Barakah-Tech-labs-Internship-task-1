import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  const databaseStates = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
  ];

  response.json({
    status: "ok",
    database: databaseStates[mongoose.connection.readyState] || "unknown",
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>
      console.error("MongoDB connection failed:", error.message),
    );
} else {
  console.warn(
    "MONGODB_URI is not set; the API is running without a database connection.",
  );
}
