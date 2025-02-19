const express = require('express');
const router = express.Router();
const { register, login, getUserById } = require('../controllers/authController'); // ✅ Ajouter getUserById

router.post('/register', register); // Inscription (user & pro)
router.post('/login', login); // Connexion

// Nouvelle route pour récupérer un utilisateur par son ID
router.get('/users/:id', getUserById); 

module.exports = router;
