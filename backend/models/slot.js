const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  start: Date,
  end: Date,
});

module.exports = mongoose.model("Slotcalendar", slotSchema);
