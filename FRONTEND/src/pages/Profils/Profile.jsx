import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profils/Profile.css";

const Profile = () => {
    const navigate = useNavigate();

    // États pour les champs du formulaire
    const [user, setUser] = useState({
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        password: "password123",
    });

    // Fonction pour gérer les changements dans les champs
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Modifications enregistrées avec succès !");
    };

    // Redirection vers le tableau de bord
    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="profile-container">
            <h2>Mon compte</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Prénom :</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Nom :</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="save-btn">
                    Enregistrer
                </button>
            </form>

            <button className="dashboard-btn" onClick={goToDashboard}>
                Accéder au tableau de bord
            </button>
        </div>
    );
};

export default Profile;
