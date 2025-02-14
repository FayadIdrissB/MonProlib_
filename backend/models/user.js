const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true }, // Ajout du nom
    prenom: { type: String, required: true }, // Prénom déjà présent
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'pro'], required: true },
    siret: { type: String, required: function () { return this.role === 'pro'; } }
});

// Hashage du mot de passe avant l'enregistrement
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);