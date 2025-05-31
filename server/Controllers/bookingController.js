const { BookingModel } = require("../Models/booking.model.js");
const { EvModel } = require("../Models/ev.model.js");

const bookAStation = async (req, res) => {
  try {
    const {
      userObjectId,
      evStationObjectId,
      bookingDate,
      vehicleType,
      vehicleNumber,
    } = req.body;

    if (
      !userObjectId ||
      !evStationObjectId ||
      !bookingDate ||
      !vehicleNumber ||
      !vehicleType
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const evStation = await EvModel.findById(evStationObjectId);
    if (!evStation) {
      return res.status(404).send({ message: "EV Station not found" });
    }

    const exisitingBookings = await BookingModel.find({
      evStation: evStationObjectId,
      bookingDate,
    });

    if (exisitingBookings.length >= evStation.availablePorts) {
      return res.status(400).send({
        message: `Total ${evStation.availablePorts} Ports are Full on this time. Please choose another time.`,
      });
    }

    const newBooking = new BookingModel({
      user: userObjectId,
      evStation: evStationObjectId,
      bookingDate,
      vehicleNumber,
      vehicleType,
    });

    await newBooking.save();
    return res
      .status(201)
      .send({ message: "Booking Successfully Completed.", newBooking });
  } catch (err) {
    console.error("Booking error:", err);
    return res
      .status(500)
      .send({ message: "Server Error", error: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const allBookings = await BookingModel.find({})
      .populate("user")
      .populate("evStation")
      .exec();
    return res.status(200).send({ data: allBookings });
  } catch (error) {
    console.error("Get all bookings error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }
    const booking = await BookingModel.findById(id)
      .populate("user")
      .populate("evStation")
      .exec();

    if (!booking) {
      return res.status(404).send({ message: "Booking Not found" });
    }
    return res.status(200).send({ message: "Booking Found", booking });
  } catch (error) {
    return res.status(500).send({ message: "Server Error" });
  }
};

const getAllBookingOfAUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allBookings = await BookingModel.find({ user: userId })
      .populate("user")
      .populate("evStation")
      .exec();

    if (!allBookings) {
      return res
        .status(404)
        .send({ messsage: "You are not booked any EV stations yet." });
    }
    return res
      .status(200)
      .send({ message: "Found all bookings", data: allBookings });
  } catch (error) {
    return res.status(500).send({ message: "Server Error." });
  }
};

const getAllBookingsOfAStationUser = async (req, res) => {
  try {
    const { stationOwnerId } = req.params;
    const allBookings = await BookingModel.find()
      .populate("user")
      .populate("evStation")
      .exec();

    if (allBookings.length === 0) {
      return res.status(404).send({ message: "Booking Not found" });
    }

    const ownedStations = allBookings.filter((booking) => {
      console.log(booking.evStation.ownerId, stationOwnerId);
      return booking?.evStation?.ownerId === stationOwnerId;
    });

    return res
      .status(200)
      .send({ message: "Found all bookings", data: ownedStations });
  } catch (error) {
    return res.status(500).send({ message: "Server Error" });
  }
};

const deleteSlotById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Slot Booking Id is required." });
    }

    const deletedBooking = await BookingModel.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).send({ message: "Booking not found." });
    }

    return res.status(200).send({ message: "Booking cancelled successfully." });
  } catch (error) {
    console.error("Delete booking error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  bookAStation,
  getAllBookings,
  getBookingById,
  getAllBookingOfAUser,
  getAllBookingsOfAStationUser,
  deleteSlotById,
};
