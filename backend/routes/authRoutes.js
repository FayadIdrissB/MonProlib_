const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); // Inscription (user & pro)
router.post('/login', login); // Connexion

module.exports = router;