const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: Date,
  end: Date,
});

module.exports = mongoose.model("Slotcalendar", slotSchema);
