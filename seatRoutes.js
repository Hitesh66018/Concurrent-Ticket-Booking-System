import express from "express";
import {
  lockSeat,
  confirmSeat,
  getAllSeats,
  resetSeats
} from "../controllers/seatController.js";

const router = express.Router();

router.post("/lock", lockSeat);
router.post("/confirm", confirmSeat);
router.get("/", getAllSeats);
router.post("/reset", resetSeats);

export default router;
