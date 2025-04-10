const Annonce = require("../models/annonce");

exports.createAnnonce = async (req, res) => {
  const newAnnnonce = new Annonce(req.body);
  await newAnnnonce.save();
  res.status(201).json(newAnnnonce);
};

exports.GetAnnonces = async (req, res) => {
  const annonces = await Annonce.find();
  res.status(201).json(annonces);
};
