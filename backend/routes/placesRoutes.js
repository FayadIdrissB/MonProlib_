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
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
            {
                params: {
                    input: `${query} ${location}`,
                    inputtype: "textquery",
                    fields: "name,formatted_address,geometry",
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Erreur API Google Places :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des lieux" });
    }
});

module.exports = router;