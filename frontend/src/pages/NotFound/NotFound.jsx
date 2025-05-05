// frontend/src/pages/NotFound/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-10">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Page non trouvée</h1>
        <p className="text-lg text-gray-600">La page que vous recherchez n'existe pas.</p>
      </div>
    </div>
  );
};

export default NotFound;
