import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

// Définir l'URL de base de l'API
const API_BASE_URL = 'http://localhost:3000'; // Ajustez selon votre configuration

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef(null);

  // Gestion de la recherche principale (service)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Gestion de la recherche de localisation
  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
    if (e.target.value.length > 2) {
      fetchPlaceSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  // Récupération des suggestions de lieux via API
  const fetchPlaceSuggestions = async (input) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/places/autocomplete?input=${encodeURIComponent(input)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error('Erreur:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sélection d'une suggestion
  const handleSuggestionClick = (suggestion) => {
    setLocationQuery(suggestion.description);
    setSuggestions([]);
  };

  // Fermer les suggestions en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Soumission du formulaire et récupération des résultats
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery || !locationQuery) {
      alert('Veuillez remplir les champs de recherche et de localisation.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/search?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      alert('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // ... Le reste du code JSX reste identique ...
  return (
    <div className="search-container">
      {/* ... Votre JSX existant ... */}
    </div>
  );
};

export default SearchBar;
