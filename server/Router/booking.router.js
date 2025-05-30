const express = require("express");
const {
  bookAStation,
  getAllBookings,
  getBookingById,
  getAllBookingOfAUser,
  getAllBookingsOfAStationUser,
  deleteSlotById,
} = require("../Controllers/bookingController.js");

const router = express.Router();

// Create a new booking
router.post("/new-booking", bookAStation);

// Get all bookings
router.get("/get-all-bookings", getAllBookings);

// Get booking by ID
router.get("/get-booking-by-id/:id", getBookingById);

// Get all bookings of a user
router.get("/user/get-all-bookings/:userId", getAllBookingOfAUser);

// Get all bookings of a station owner
router.get(
  "/station/get-all-bookings/:stationOwnerId",
  getAllBookingsOfAStationUser
);

// Delete booking by ID
router.delete("/delete-slot-by-id/:id", deleteSlotById);

module.exports = router;
