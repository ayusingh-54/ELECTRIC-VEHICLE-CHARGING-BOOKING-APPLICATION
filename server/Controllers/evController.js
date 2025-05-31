const { EvModel } = require("../Models/ev.model.js");

const getAllStationsFun = async () => {
  const allStations = await EvModel.find({});
  return allStations;
};

const createStation = async (req, res) => {
  try {
    const {
      stationName,
      location,
      availablePorts,
      totalPorts,
      pricePerHour,
      ownerId,
      coordinates,
    } = req.body;

    if (
      !ownerId ||
      !stationName ||
      !location ||
      !availablePorts ||
      !totalPorts ||
      !pricePerHour
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    // Default coordinates if not provided
    const stationCoordinates = coordinates || {
      lat: 0,
      lng: 0,
    };

    const newEvStation = new EvModel({
      stationName,
      location,
      availablePorts,
      totalPorts,
      pricePerHour,
      ownerId,
      coordinates: stationCoordinates,
    });

    await newEvStation.save();
    res
      .status(201)
      .send({ message: "New Station created successfully.", newEvStation });
  } catch (error) {
    console.error("Error creating station:", error);
    return res.status(500).send("Server Error");
  }
};

const getAllStations = async (req, res) => {
  try {
    const allEvStations = await getAllStationsFun();
    res.status(200).send({ data: allEvStations });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const evStation = await EvModel.findById(id);
    if (evStation) {
      return res.status(200).send({ data: evStation });
    } else {
      return res.status(404).send({ message: "Station not found" });
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getStationsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const stations = await EvModel.find({
      location: { $regex: location, $options: "i" },
    });
    res.status(200).send({ data: stations });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const deleteStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStation = await EvModel.findByIdAndDelete(id);
    if (deletedStation) {
      return res.status(200).send({ message: "Station deleted successfully" });
    } else {
      return res.status(404).send({ message: "Station not found" });
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const bookSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await EvModel.findById(id);

    if (!station) {
      return res.status(404).send({ message: "Station not found" });
    }

    if (station.availablePorts > 0) {
      station.availablePorts -= 1;
      await station.save();
      return res.status(200).send({
        message: "Slot booked successfully",
        station,
      });
    } else {
      return res.status(400).send({ message: "No available slots" });
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  getStationsByLocation,
  deleteStationById,
  bookSlot,
};
