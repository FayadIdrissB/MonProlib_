const mongoose = require("mongoose");

const anonceSchema = new mongoose.Schema({
  nameCompany: {
    type: String,
    required: true,
  },
  adresCompany: {
    type: String,
    required: true,
  },
  workHours: {
    monday: { start: String, end: String, closed: Boolean },
    tuesday: { start: String, end: String, closed: Boolean },
    wednesday: { start: String, end: String, closed: Boolean },
    thursday: { start: String, end: String, closed: Boolean },
    friday: { start: String, end: String, closed: Boolean },
    saturday: { start: String, end: String, closed: Boolean },
    sunday: { start: String, end: String, closed: Boolean },
  },
  activities: [
    {
      name: String,
      description: String,
      duration: String,
    },
  ],
});

module.exports = mongoose.model("AnnonceSchema", anonceSchema);