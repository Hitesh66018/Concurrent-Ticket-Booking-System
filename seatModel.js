import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true, unique: true },
  isBooked: { type: Boolean, default: false },
  lockedBy: { type: String, default: null },
  lockExpiresAt: { type: Date, default: null },
});

export default mongoose.model("Seat", seatSchema);
