const mongoose = require("mongoose");

const evSchema = new mongoose.Schema(
  {
    stationName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    availablePorts: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPorts: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EvModel = mongoose.model("EvStation", evSchema);

module.exports = { EvModel };
