import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Connexion réussie !");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Se connecter</button>
          
        </form>
        <p className="divider">Ou</p>
        <div className="social-login">
          <button className="social-button google">
            <FaGoogle /> Connexion avec Google
          </button>
          <button className="social-button facebook">
            <FaFacebook /> Connexion avec Facebook
          </button>
        </div>
        <Link to="/forgot-password" style={{marginTop:"2px"}}>Mot de passe oublié ?</Link>
        {/* <p className="forgot-password">Mot de passe oublié ?</p> */}
        {/* <p className="forgot-password"><Link to="/forgot-password">Mot de passe oublié ?</Link></p> */}
      </div>
    </div>
  );
};

export default Login;
