const express = require("express");
const {
  createStation,
  getAllStations,
  getStationById,
  getStationsByLocation,
  deleteStationById,
  bookSlot,
} = require("../Controllers/evController.js");

const router = express.Router();

// Create a new EV station
router.post("/create", createStation);

// Get all stations
router.get("/all-stations", getAllStations);

// Get station by ID
router.get("/station-id/:id", getStationById);

// Get stations by location
router.get("/location/:location", getStationsByLocation);

// Delete station by ID
router.delete("/delete/:id", deleteStationById);

// Book a slot (legacy endpoint)
router.patch("/book-slot/:id", bookSlot);

module.exports = router;
