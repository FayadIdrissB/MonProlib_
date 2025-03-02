const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// 🟢 Fonction de normalisation des mots-clés
const normalizeQuery = (query) => {
    const lowerQuery = query.toLowerCase();

    // Dictionnaire de normalisation
    const keywordMap = {
        "lavage auto": "car wash",
        "station de lavage": "car wash",
        "lavage voiture": "car wash",
        "garage auto": "garage",
        "réparation voiture": "garage",
        "carrosserie": "garage",
        "atelier mécanique": "garage",
        "mécanicien": "garage",
        "mécanicien auto": "garage",
        "mécanicien automobile": "garage"
    };

    // Normaliser les mots-clés en utilisant le dictionnaire
    for (const [key, value] of Object.entries(keywordMap)) {
        if (lowerQuery.includes(key)) {
            return value;
        }
    }

    // Si aucun mot-clé connu n'est trouvé, retourner la requête d'origine
    return lowerQuery;
};

router.get("/search", async (req, res) => {
    const { query, location } = req.query;

    if (!query || !location) {
        return res.status(400).json({ error: "Les paramètres 'query' et 'location' sont requis" });
    }

    try {
        // 1️⃣ Convertir l'adresse en latitude/longitude + Détecter la ville exacte
        const geoResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    address: location,
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        if (!geoResponse.data.results.length) {
            return res.status(404).json({ message: "Localisation introuvable" });
        }

        const { lat, lng } = geoResponse.data.results[0].geometry.location;
        const cityName = geoResponse.data.results[0].address_components.find(component =>
            component.types.includes("locality")
        )?.long_name || location;

        console.log(`📍 Ville détectée : ${cityName} | Coordonnées : lat=${lat}, lng=${lng}`);

        // 🟢 Normaliser la requête utilisateur
        const normalizedQuery = normalizeQuery(query);

        // 2️⃣ Déterminer le type de recherche
        let placeType = "";
        if (normalizedQuery.includes("garage")) {
            placeType = "car_repair";
        } else if (normalizedQuery.includes("car wash")) {
            placeType = "car_wash";
        } else {
            return res.status(400).json({ error: "Recherche non autorisée. Veuillez chercher un garage ou un lavage auto." });
        }

        console.log(`🔍 Type de recherche détecté : ${placeType}`);

        // 3️⃣ Requête à Google Places pour récupérer les garages/lavages
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius: 5000,
                    type: placeType,
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        console.log("📌 Résultats bruts API Google Places :", placesResponse.data);

        const filteredResults = placesResponse.data.results.filter(place => {
            const address = place.formatted_address || place.vicinity || "";
            return address.toLowerCase().includes(cityName.toLowerCase());
        });

        console.log("🚗 Résultats après filtrage par ville :", filteredResults);

        if (!filteredResults.length) {
            return res.status(404).json({ message: `Aucun résultat trouvé pour "${query}" à ${cityName}.` });
        }

        res.json({ results: filteredResults });
    } catch (error) {
        console.error("❌ Erreur API Google Places :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des lieux" });
    }
});

module.exports = router;