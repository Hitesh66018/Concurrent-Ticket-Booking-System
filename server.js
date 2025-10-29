import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import seatRoutes from "./src/routes/seatRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/seats", seatRoutes);

app.get("/", (req, res) => {
  res.send("🎟️ Ticket Booking API Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
