import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/style.css";


const Login = () => {
  return (
    <>
      
      <main className="login">
        <h2>SE CONNECTER</h2>
        <form>
          <input type="email" placeholder="Entrez votre adresse mail" required />
          <input type="password" placeholder="Entrez votre mot de passe" required />
          <button type="submit" className="btn-primary">Se connecter</button>
        </form>
        <p><Link to="/forgot-password">Mot de passe oublié ?</Link></p>
        <p>Pas encore inscrit ? <Link to="/register">Créer un compte</Link></p>
      </main>
      
    </>
  );
};

export default Login;


// export default function Login() {
//   return (
//     <div className="container mx-auto max-w-md mt-20 p-6 shadow-lg rounded-md bg-white">
//       <h2 className="text-2xl font-bold text-center text-green-700">Connexion</h2>
//       <input type="email" placeholder="Email" className="w-full border p-2 mt-3" />
//       <input type="password" placeholder="Mot de passe" className="w-full border p-2 mt-3" />
//       <button className="bg-green-600 text-white py-2 px-4 w-full mt-3">Se connecter</button>
//       <p className="text-center text-sm mt-3">
//         <Link to="/forgot-password" className="text-blue-500">Mot de passe oublié ?</Link>
//       </p>
//       <p className="text-center text-sm mt-1">
//         Pas encore inscrit ? <Link to="/register" className="text-blue-500">Créer un compte</Link>
//       </p>
//     </div>
//   );
// }
