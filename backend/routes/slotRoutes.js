const express = require("express");
const {
  getSlots,
  createSlot,
  deleteSlot,
} = require("../controllers/slotController");

const router = express.Router();

router.get("/", getSlots);
router.post("/", createSlot);
router.delete("/:id", deleteSlot);

module.exports = router;
