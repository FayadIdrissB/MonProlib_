const Annonce = require("../models/annonce");

exports.createAnnonce = async (req, res) => {
  const newAnnnonce = new Annonce(req.body);
  await newAnnnonce.save();
  res.status(201).json(newAnnnonce);
};

exports.GetActivitys = async (req, res) => {
  try {
    const activities = await Annonce.aggregate([
      { $unwind: "$activities" },
      { $replaceRoot: { newRoot: "$activities" } },
    ]);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.GetAnnonces = async (req, res) => {
  const annonces = await Annonce.find();
  res.status(201).json(annonces);
};
