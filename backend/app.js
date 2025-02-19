const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Chargement des variables d'environnement
require('dotenv').config();

// Importation des routes
const authRoutes = require('./routes/authRoutes');

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion MongoDB réussie'))
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB :', err);
    process.exit(1); // Quitte le serveur si la connexion échoue
  });

// Vérification de l'état de la connexion MongoDB
mongoose.connection.on('connected', () => {
  console.log('✅ Connexion MongoDB active');
});

// Routes
app.use('/api/auth', authRoutes);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Une erreur interne est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;