const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 🟢 Fonction pour vérifier l'existence du téléphone
const checkPhone = async (req, res) => {
    try {
        const { telephone } = req.params;
        const existingUser = await User.findOne({ telephone });

        if (existingUser) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du téléphone :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// 🟢 Fonction pour vérifier l'existence du SIRET
const checkSiret = async (req, res) => {
    try {
        const { siret } = req.params;
        const existingUser = await User.findOne({ siret });

        if (existingUser) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du SIRET :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// 🟢 Fonction d'inscription
const register = async (req, res) => {
    try {
        const { nom, prenom, email, password, telephone, siret } = req.body;

        // 🟢 Vérifier l'existence de l'email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // 🟢 Vérifier l'existence du téléphone
        const existingPhone = await User.findOne({ telephone });
        if (existingPhone) {
            return res.status(400).json({ error: 'Ce numéro de téléphone est déjà utilisé' });
        }

        // 🟢 Vérifier l'existence du SIRET
        if (siret) {
            const existingSiret = await User.findOne({ siret });
            if (existingSiret) {
                return res.status(400).json({ error: 'Ce numéro de SIRET est déjà utilisé' });
            }
        }

        const role = siret ? 'pro' : 'user';
        const hashedPassword = await bcrypt.hash(password, 10); // 🟢 Hash du mot de passe

        const user = new User({ nom, prenom, email, password: hashedPassword, telephone, role, siret: siret || null });
        await user.save();

        res.status(201).json({ message: `Compte ${role} créé avec succès`, role });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);

        // 🟢 Gérer les erreurs de duplication (email, téléphone, SIRET)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const message = field === 'email' ? 'Cet email est déjà utilisé' :
                            field === 'telephone' ? 'Ce numéro de téléphone est déjà utilisé' :
                            field === 'siret' ? 'Ce numéro de SIRET est déjà utilisé' :
                            'Un champ unique est déjà utilisé';

            return res.status(400).json({ error: message });
        }

        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// 🟢 Fonction de connexion
const login = async (req, res) => {
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
            prenom: user.prenom
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// 🟢 Fonction pour obtenir un utilisateur par ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclure le mot de passe pour la sécurité

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// 🟢 Export des fonctions
module.exports = {
    checkPhone,
    checkSiret,
    register,
    login,
    getUserById
};