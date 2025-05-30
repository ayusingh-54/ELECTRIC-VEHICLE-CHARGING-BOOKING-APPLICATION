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
    if (location === "" || !location) {
      const allEvStations = await getAllStationsFun();
      return res.status(200).send({ data: allEvStations });
    }
    const evStation1 = await EvModel.find({
      location: { $regex: location, $options: "i" },
    });
    const evStation2 = await EvModel.find({
      stationName: { $regex: location, $options: "i" },
    });

    // Remove duplicates by converting to Set and back to Array
    const evStations = [
      ...new Map(
        [...evStation1, ...evStation2].map((station) => [
          station._id.toString(),
          station,
        ])
      ).values(),
    ];

    return res.status(200).send({ data: evStations });
  } catch (error) {
    console.error("Error in getStationsByLocation:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const deleteStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const evStation = await EvModel.findByIdAndDelete(id);
    if (evStation) {
      return res
        .status(200)
        .send({ message: "Station deleted successfully", data: evStation });
    } else {
      return res.status(404).send({ message: "EV Station not found" });
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const bookSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const evStation = await EvModel.findById(id);
    if (!evStation) {
      return res.status(404).send({ message: "EV Station Not Found" });
    }
    if (evStation.availablePorts > 0) {
      evStation.availablePorts--;
      await evStation.save();
      return res.status(200).send({
        data: evStation,
        message: `${evStation.stationName} Station Booked Successfully.`,
      });
    } else {
      return res.status(400).send({
        message: `${evStation.stationName} Station is Not Available Right Now.`,
      });
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
