import React from "react";
import '../Password/ForgetPassword.css'


const ForgotPassword = () => {
  return (
    <>
     
      <main className="forgot-password">
        <h2>Réinitialiser votre mot de passe</h2>
        <form>
          <input type="email" placeholder="Votre email" required />
          <button type="submit" className="btn-primary">Envoyer le lien</button>
        </form>
      </main>
      
    </>
  );
};

export default ForgotPassword;
