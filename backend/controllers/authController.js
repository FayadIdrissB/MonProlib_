const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password, siret } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Déterminer le rôle en fonction de la présence du SIRET
        const role = siret ? 'pro' : 'user';

        const user = new User({ email, password, role, siret: siret || null });
        await user.save();

        res.status(201).json({ message: `Compte ${role} créé avec succès`, role });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Générer un token avec le rôle inclus
        const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};