import express from "express";
dotenv.config();
import dotenv from "dotenv";
import { sendMessage } from "../bot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sendMessage("First message from server");

app.get("/", (req, res) => {
  sendMessage("Hello from the API / route");
  res.send("Discord Bot Server is Running!");
});

app.post("/send-message", (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);
  const success = sendMessage(message);
  return res.send(success ? "Message sent!" : "Failed to send message");
});
