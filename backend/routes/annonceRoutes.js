const express = require("express");
const {
  createAnnonce,
  GetActivitys,
} = require("../controllers/annonceController");

const router = express.Router();

router.post("/", createAnnonce);
router.get("/", GetActivitys);

module.exports = router;
