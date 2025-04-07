const express = require("express");
const { createAnnonce } = require("../controllers/annonceController");

const router = express.Router();

router.post("/", createAnnonce);

module.exports = router;