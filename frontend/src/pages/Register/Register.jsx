import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation
import '../Register/Register.css';

const Register = () => {
  const navigate = useNavigate(); // Hook pour la redirection

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <>
      <main className='register'>
        <h2>Créer un compte</h2>
        <form>
          <input type='text' placeholder='Nom' />
          <input type='text' placeholder='Prénom' />
          <input type='email' placeholder='Email' required />
          <div className='form-group'>
            <select id='sexe' name='sexe'>
              <option value=''>Sexe</option>
              <option value='homme'>Homme</option>
              <option value='femme'>Femme</option>
              <option value='autre'>Autre</option>
            </select>
          </div>
          <div className='form-group'>
            <input type='date' id='date_naissance' name='date_naissance' />
          </div>
          <input type='password' placeholder='Mot de passe' required />
          <input type='password' placeholder='Confirmer le mot de passe' required />
          <button type='submit' className='btn-register'>
            S&apos;inscrire
          </button>   
          <button type='button' className='btn-login' onClick={handleLoginRedirect}> Se connecter </button>
      
        </form>
      </main>
    </>
  );
};

export default Register;
