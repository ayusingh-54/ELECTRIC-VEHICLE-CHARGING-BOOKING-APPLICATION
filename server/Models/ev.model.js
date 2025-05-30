const mongoose = require("mongoose");

const evStationSchema = new mongoose.Schema(
  {
    stationName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: Number,
        default: 0,
      },
    },
    totalPorts: {
      type: Number,
      required: true,
    },
    availablePorts: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
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

const EvModel = mongoose.model("EvStation", evStationSchema);

module.exports = { EvModel };
