import React from "react";
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import "../styles/style.css";

const Register = () => {
  const navigate = useNavigate(); // Hook pour la redirection

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <>
      <main className="register">
        <h2>Créer un compte</h2>
        <form>
          <input type="text" placeholder="Nom" />
          <input type="text" placeholder="Prénom" />
          <input type="email" placeholder="Email" required />
          <div className="form-group">
            <select id="sexe" name="sexe">
              <option value="">Sexe</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div className="form-group">
            <input type="date" id="date_naissance" name="date_naissance" />
          </div>
          <input type="password" placeholder="Mot de passe" required />
          <input type="password" placeholder="Confirmer le mot de passe" required />
          <button type="submit" className="btn-register">
            S'inscrire
          </button>
        
          {/* <button type="button" className="btn-login" onClick={handleLoginRedirect}> Se connecter </button> */}
      
        </form>

      </main>
    </>
  );
};

export default Register;



// export default function Register() {
//   const [formData, setFormData] = useState({ nom: "", email: "", password: "", role: "Client" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) navigate("/login");
//   };

//   return (
//     <div className="container mx-auto max-w-md p-6 shadow-lg rounded-md bg-white">
//       <h2 className="text-2xl font-bold text-center text-green-700">Créer un Compte</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required className="w-full border p-2 mt-3" />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2 mt-3" />
//         <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required className="w-full border p-2 mt-3" />
//         <button className="bg-green-600 text-white py-2 px-4 w-full mt-3">S'inscrire</button>
//       </form>
//     </div>
//   );
// }
