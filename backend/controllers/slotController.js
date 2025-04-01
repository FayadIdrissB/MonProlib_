const Slot = require("../models/slot.js");

exports.getSlots = async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
};

exports.createSlot = async (req, res) => {
  const newSlot = new Slot(req.body);
  await newSlot.save();
  res.status(201).json(newSlot);
};

exports.deleteSlot = async (req, res) => {
  await Slot.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
