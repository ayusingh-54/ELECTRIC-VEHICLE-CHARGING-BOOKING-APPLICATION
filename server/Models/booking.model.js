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
    vehicleType: {
      type: String,
      required: true,
      enum: ["two-wheeler", "four-wheeler"],
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = { BookingModel };
