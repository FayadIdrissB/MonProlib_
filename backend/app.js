const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


require('dotenv').config();


app.use(cors({
    origin: 'http://localhost:3001' // Remplace par l'URL de ton frontend
}));


app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connexion MongoDB réussie'))
    .catch(err => console.error('❌ Erreur MongoDB :', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

module.exports = app;