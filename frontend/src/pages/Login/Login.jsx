import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
<<<<<<< HEAD
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Connexion réussie !");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Email ou mot de passe incorrect.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="/images/logo.png"
            alt="Thé Tip Top"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connectez-vous à votre compte
          </h2>
          {/* Link to register moved below the form */}
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
              créez un nouveau compte
            </Link>
          </p> */}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Adresse Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Adresse Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
             <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Se connecter
            </button>
          </div>
        </form>
        
        {/* Register Link styled as a secondary button */}
        <div className="mt-4 text-center">
           <Link 
              to="/register" 
              className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
             Créer un nouveau compte
            </Link>
        </div>

        {/* Social Login Section Commented Out */}
        {/*
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Connexion avec Google</span>
              <FaGoogle className="w-5 h-5 text-red-500" />
            </button>
          </div>

          <div>
            <button
              onClick={handleFacebookLogin}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Connexion avec Facebook</span>
              <FaFacebook className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
        */}
      </div>
    </main>
  );
};

export default Login;
=======
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      // const response = await axios.post("https://www.backend.dsp5-archi-f24a-15m-g8.fr/api/auth/login", {
        email,
        password,
      });

      
            // Store token in localStorage
            localStorage.setItem("token", response.data.token);
      
            // Check user type and redirect accordingly
            const userType = response.data.user.userType;
      
            if (userType === "admin") {
              // Redirect admin users to admin dashboard
              navigate("/admindashboard");
            } else if (userType === "employer") {
              // Redirect employee users to employee dashboard
              navigate("/employeedashboard");
            } else {
              // Redirect client users to client dashboard or home page
              navigate("/clientdashboard");
            }
      
            alert("Connexion réussie !");
          } catch (err) {
            setError(
              err.response?.data?.message || "Email ou mot de passe incorrect."
            );
          }
        };
      
        const handleGoogleLogin = () => {
          console.log("Google login clicked");
        };
      
        const handleFacebookLogin = () => {
          console.log("Facebook login clicked");
        };
      
        return (
          <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
              <div>
                <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Connectez-vous à votre compte
                </h3>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Ou{" "}
                  <Link
                    to="/register"
                    className="font-medium text-teal-600 hover:text-teal-500"
                  >
                    créez un compte
                  </Link>
                </p>
              </div>
      
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
      
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Entrez votre email"
                  />
                </div>
      
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Entrez votre mot de passe"
                  />
                </div>
      
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Se souvenir de moi
                    </label>
                  </div>
      
                  <div className="text-sm">
                    <Link
                      to="/forgotpassword"
                      className="font-medium text-teal-600 hover:text-teal-500"
                    >
                      Mot de passe oublié?
                    </Link>
                  </div>
                </div>
      
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
      
              {/* Comment out social login buttons until they are implemented */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Connexion avec Google</span>
                    <FaGoogle className="w-5 h-5 text-red-500" />
                  </button>
                </div>
      
                <div>
                  <button
                    onClick={handleFacebookLogin}
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Connexion avec Facebook</span>
                    <FaFacebook className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </div>
              
            </div>
          </main>
        );
      };
      
      export default Login;
      
>>>>>>> df0fa71cbf65b7a5e01c74aa12342c91324b0345
