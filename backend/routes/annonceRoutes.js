const express = require("express");
const {
  createAnnonce,
  GetActivitys,
  GetAnnonces,
} = require("../controllers/annonceController");

const router = express.Router();

router.post("/", createAnnonce);

router.get("/", GetAnnonces);
router.get("/activitys", GetActivitys);

module.exports = router;
