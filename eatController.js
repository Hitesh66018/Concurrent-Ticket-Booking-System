import Seat from "../models/seatModel.js";

// Lock a seat (for a specific user)
export const lockSeat = async (req, res) => {
  const { seatNumber, userId } = req.body;
  const lockDuration = 60 * 1000; // 1 minute lock

  try {
    const seat = await Seat.findOne({ seatNumber });

    if (!seat) return res.status(404).json({ message: "Seat not found" });

    // Check if already booked
    if (seat.isBooked)
      return res.status(400).json({ message: "Seat already booked" });

    // Check if locked by someone else
    if (
      seat.lockedBy &&
      seat.lockExpiresAt &&
      seat.lockExpiresAt > new Date()
    ) {
      return res.status(400).json({ message: "Seat temporarily locked" });
    }

    // Lock seat
    seat.lockedBy = userId;
    seat.lockExpiresAt = new Date(Date.now() + lockDuration);
    await seat.save();

    res.json({ message: "Seat locked successfully", seat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm seat booking
export const confirmSeat = async (req, res) => {
  const { seatNumber, userId } = req.body;

  try {
    const seat = await Seat.findOne({ seatNumber });

    if (!seat) return res.status(404).json({ message: "Seat not found" });

    // Check if the user holds the lock
    if (seat.lockedBy !== userId)
      return res.status(403).json({ message: "Seat not locked by this user" });

    // Check if lock expired
    if (seat.lockExpiresAt < new Date())
      return res.status(400).json({ message: "Seat lock expired" });

    // Confirm booking
    seat.isBooked = true;
    seat.lockedBy = null;
    seat.lockExpiresAt = null;
    await seat.save();

    res.json({ message: "Seat booked successfully", seat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all seats
export const getAllSeats = async (req, res) => {
  const seats = await Seat.find();
  res.json(seats);
};

// Reset all seats (for testing)
export const resetSeats = async (req, res) => {
  await Seat.deleteMany();
  const seats = [];
  for (let i = 1; i <= 10; i++) {
    seats.push({ seatNumber: `S${i}` });
  }
  await Seat.insertMany(seats);
  res.json({ message: "All seats reset successfully", seats });
};
