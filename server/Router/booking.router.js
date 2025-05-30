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

// POST /booking/new-booking
router.post("/new-booking", bookAStation);

// GET /booking/get-all-bookings
router.get("/get-all-bookings", getAllBookings);

// GET /booking/:id
router.get("/:id", getBookingById);

// GET /booking/user/get-all-bookings/:userId
router.get("/user/get-all-bookings/:userId", getAllBookingOfAUser);

// GET /booking/station/get-all-bookings/:stationOwnerId
router.get(
  "/station/get-all-bookings/:stationOwnerId",
  getAllBookingsOfAStationUser
);

// DELETE /booking/delete-slot-by-id/:id
router.delete("/delete-slot-by-id/:id", deleteSlotById);

module.exports = router;
