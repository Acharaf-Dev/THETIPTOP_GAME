// Fichier principal React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game/Game'; 
import Regle from './pages/Regle'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profils/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './pages/Dashbords/AdminDashboard';
import EmployeeDashboard from './pages/Dashbords/EmployeeDashboard';
import ClientDashboard from './pages/Dashbords/ClientDashboard';


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
          <Route path="/game" element={<Game />} /> {/* Chemin ajouté pour Game */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
