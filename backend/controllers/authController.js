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
        const { nom, prenom, email, password, telephone, role, siret } = req.body;

        // Vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Si le rôle est 'pro', assure-toi que le siret est fourni
        if (role === 'pro' && !siret) {
            return res.status(400).json({ error: 'Le numéro SIRET est requis pour un compte professionnel' });
        }

        // Création de l'utilisateur avec les données fournies
        const newUser = new User({
            nom,
            prenom,
            email,
            password,
            telephone,
            role,
            siret
        });

        // Sauvegarde de l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            userId: newUser._id,
            prenom: newUser.prenom
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
// 🟢 Fonction de connexion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Recherche l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Comparaison du mot de passe en clair avec le mot de passe haché dans la base de données
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Création du token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            'SECRET_KEY', // Remplace cela par une clé secrète plus sécurisée, idéalement dans un fichier de config
            { expiresIn: '1h' }
        );

        // Retourne la réponse avec le token et d'autres informations de l'utilisateur
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