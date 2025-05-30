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

// POST /ev/create
router.post("/create", createStation);

// GET /ev/all-stations
router.get("/all-stations", getAllStations);

// GET /ev/:id
router.get("/:id", getStationById);

// GET /ev/location/:location
router.get("/location/:location", getStationsByLocation);

// DELETE /ev/delete/:id
router.delete("/delete/:id", deleteStationById);

// PATCH /ev/book-slot/:id
router.patch("/book-slot/:id", bookSlot);

module.exports = router;
