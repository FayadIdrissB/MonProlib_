const express = require('express');
const router = express.Router();
const { register, login, getUserById, checkSiret, checkPhone } = require('../controllers/authController');

// 🟢 Console.log pour vérifier si les fonctions sont bien importées
console.log({
    register,
    login,
    getUserById,
    checkSiret,
    checkPhone
});

router.get('/check-phone/:telephone', checkPhone);
router.get('/check-siret/:siret', checkSiret);

router.post('/register', register);
router.post('/login', login);
router.get('/users/:id', getUserById);

module.exports = router;