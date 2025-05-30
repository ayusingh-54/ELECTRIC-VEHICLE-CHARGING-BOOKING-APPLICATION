const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EvStation",
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ["two-wheeler", "four-wheeler"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = { BookingModel };
