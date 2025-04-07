const Annonce = require("../models/annonce");

exports.createAnnonce = async (req, res) => {
  const newAnnnonce = new Annonce(req.body);
  await newAnnnonce.save();
  res.status(201).json(newAnnnonce);
};
