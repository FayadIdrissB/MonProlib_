const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/authController");

// Route pour récupérer un utilisateur par son ID
router.get("/:id", getUserById);

module.exports = router;