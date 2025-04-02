// Fichier principal React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game'; 
import Regle from './pages/Reglement/Regle'; 
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profils/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './pages/Dashbords/AdminDashboard';
import EmployeeDashboard from './pages/Dashbords/EmployeeDashboard';
import ClientDashboard from './pages/Dashbords/ClientDashboard';
import About from './pages/About/About';
import CGU from './pages/Confidentialite/Cgu';
import CGV from './pages/Confidentialite/Cgv';
import Mention from './pages/Confidentialite/Mention';
import Politique from './pages/Confidentialite/Politique';
import ForgotPassword from './pages/Password/ForgotPassword';


function App() {
  return (
    <Router>
      <div id="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/reglement" element={<Regle />} />
          <Route path="/about" element={<About />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/mention" element={<Mention />} />
          <Route path="/politique" element={<Politique />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/game" element={<Game />} /> {/* Chemin ajouté pour Game */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
