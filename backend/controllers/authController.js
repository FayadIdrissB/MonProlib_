const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, password, siret } = req.body; // ✅ Ajouter nom et prenom
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Déterminer le rôle en fonction de la présence du SIRET
        const role = siret ? 'pro' : 'user';

        // ✅ Ajouter nom et prenom lors de la création de l'utilisateur
        const user = new User({ nom, prenom, email, password, role, siret: siret || null });
        await user.save();

        res.status(201).json({ message: `Compte ${role} créé avec succès`, role });
    } catch (error) {
        console.error(error); // ✅ Ajoute un log pour voir les erreurs dans la console
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

        const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({ 
            message: 'Connexion réussie', 
            token, 
            role: user.role, 
            userId: user._id, 
            prenom: user.prenom  // ✅ Ajout du prénom
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // On enlève le password pour la sécurité

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};