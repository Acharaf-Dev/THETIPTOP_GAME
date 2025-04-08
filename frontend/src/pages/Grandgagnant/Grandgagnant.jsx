import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserIcon, CalendarIcon, GiftIcon } from '@heroicons/react/outline'; // Icônes pour l'interface
import { SparklesIcon } from '@heroicons/react/solid'; // Icône de succès

const GrandGagnant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilisation de navigate

  const handleGrandTirage = async () => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/grandtirage`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message || 'Erreur lors du tirage.');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors du tirage. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Redirection si l'utilisateur n'est pas admin ou connecté
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="bg-[#68902b] p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-8 text-shadow-md">
          🎉 Élection du Grand Gagnant 🎉
        </h1>

        <div className="flex justify-center mb-6">
          <SparklesIcon className="h-12 sm:h-16 lg:h-20 w-12 sm:w-16 lg:w-20 text-yellow-400 animate-bounce" />
        </div>

        <p className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">
          C'est le moment tant attendu ! Cliquez sur le bouton ci-dessous pour lancer le tirage et désigner le grand gagnant 🎁
        </p>

        {isLoading ? (
          <div className="text-center text-xl sm:text-2xl text-teal-600">Chargement du tirage...</div>
        ) : (
          <button
            onClick={handleGrandTirage}
            className="bg-[#90db20] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:bg-[#7fa61f] transform hover:scale-105 transition duration-300"
          >
            Lancer le Tirage 🎰
          </button>
        )}

        {message && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
            <SparklesIcon className="inline h-5 w-5 mr-2 text-green-600" />
            <strong>Succès !</strong> {message}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
            <GiftIcon className="inline h-5 w-5 mr-2 text-red-600" />
            <strong>Erreur !</strong> {error}
          </div>
        )}

        <div className="mt-8">
          <p className="font-medium text-gray-100 text-lg sm:text-xl">
            <GiftIcon className="inline h-6 sm:h-7 w-6 sm:w-7 mr-2 text-teal-600" />
            Le grand gagnant recevra un prix d'une valeur de 360 euros !
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrandGagnant;
