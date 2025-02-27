const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

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

        // 2️⃣ Déterminer le type de recherche
        let placeType = "";
        if (query.toLowerCase().includes("garage")) {
            placeType = "car_repair";  // 🔧 Recherche de garages uniquement
        } else if (query.toLowerCase().includes("lavage") || query.toLowerCase().includes("car wash")) {
            placeType = "car_wash";  // 🚗 Recherche de stations de lavage uniquement
        } else {
            placeType = ["car_repair", "car_wash"];  // ✅ Recherche des deux si pas de précision
        }

        console.log(`🔍 Type de recherche détecté : ${placeType}`);

        // 3️⃣ Requête à Google Places pour récupérer les garages/lavages
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius: 5000,
                    type: placeType,  // ✅ Appliquer le bon type
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        console.log("📌 Résultats bruts API Google Places :", placesResponse.data);

        // 4️⃣ Filtrer pour garder uniquement les résultats de la ville demandée
        const filteredResults = placesResponse.data.results.filter(place => {
            const address = place.formatted_address || place.vicinity || "";
            return address.toLowerCase().includes(cityName.toLowerCase());
        });

        console.log("🚗 Résultats après filtrage par ville :", filteredResults);

        if (!filteredResults.length) {
            return res.status(404).json({ message: `Aucun résultat trouvé pour "${query}" à ${cityName}.` });
        }

        // 5️⃣ Retourner uniquement les résultats valides
        res.json({ results: filteredResults });
    } catch (error) {
        console.error("❌ Erreur API Google Places :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des lieux" });
    }
});

module.exports = router;