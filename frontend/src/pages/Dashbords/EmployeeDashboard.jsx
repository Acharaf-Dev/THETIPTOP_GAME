<<<<<<< HEAD
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout'; // Adjust path if needed
// Removed: import './employee.css';

const EmployeeDashboard = () => {
  // TODO: Fetch actual employee data (name, assigned tasks, etc.)
  const employeeName = "Alice Martin"; // Example data
  const tasks = [
      { id: 1, title: "Valider les tickets gagnants", status: "En cours" },
      { id: 2, title: "Préparer les lots pour l'expédition", status: "À faire" },
      { id: 3, title: "Répondre aux demandes clients", status: "En cours" },
  ]; // Example data

  return (
    <DashboardLayout userType="employee">
        {/* Page specific content */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Bienvenue, {employeeName} !
        </h1>

        {/* Example Content Cards */}
        <div className="grid grid-cols-1 gap-6">
            {/* Tasks List Card */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Mes Tâches Actuelles</h3>
                {tasks.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {tasks.map(task => (
                            <li key={task.id} className="py-3 flex justify-between items-center">
                                <span className="text-gray-800">{task.title}</span>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {task.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Vous n'avez aucune tâche assignée pour le moment.</p>
                )}
            </div>

            {/* Add more sections specific to employee tasks or information */}
        </div>
        
         {/* Placeholder for more content */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Notifications</h3>
            <p className="text-gray-600">Ici pourraient se trouver les notifications importantes.</p>
        </div>

    </DashboardLayout>
  );
}

export default EmployeeDashboard;
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from '../../components/DashboardLayout';
import { FiGift, FiSearch, FiBarChart2 } from "react-icons/fi";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
const ITEMS_PER_PAGE = 20;

const EmployeeDashboard = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [gains, setGains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWinners, setFilterWinners] = useState(false);
  const [minPrizeValue, setMinPrizeValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token d'authentification non trouvé. Merci de vous reconnecter.");
        setLoading(false);
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [usersRes, gainsRes] = await Promise.all([
          axios.get(`${API_URL}/user/allclients`, { headers }),
          axios.get(`${API_URL}/user/usersgains`, { headers })
        ]);

        setUsers(usersRes.data.clients || []);
        setGains(gainsRes.data.gains || []);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err.response || err);
        setError(err.response?.data?.message || "Impossible de récupérer les données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const gainsByUser = users.map(user => {
    const userGains = gains.filter(g => g.userId === user._id && g.prizeValue >= minPrizeValue);
    return {
      ...user,
      gains: userGains
    };
  });

  const filteredData = gainsByUser.filter(user => {
    const matchesSearch = user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const isWinner = filterWinners ? user.gains.length > 0 : true;
    return matchesSearch && isWinner;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalWinners = gainsByUser.filter(u => u.gains.length > 0).length;
  const totalPrizeValue = gains.reduce((acc, g) => acc + (g.prizeValue || 0), 0);

  return (
    <DashboardLayout userType="employer">
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tableau des Clients & Gains</h1>

        {/* Statistiques */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <FiGift className="text-green-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Nombre de gagnants</p>
              <p className="font-bold text-lg">{totalWinners}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FiBarChart2 className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Valeur totale des lots</p>
              <p className="font-bold text-lg">{totalPrizeValue} €</p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              checked={filterWinners}
              onChange={() => setFilterWinners(!filterWinners)}
            />
            <span className="text-sm text-gray-700">Afficher uniquement les gagnants</span>
          </label>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Valeur minimale du lot (€):</label>
            <input
              type="number"
              min="0"
              value={minPrizeValue}
              onChange={(e) => setMinPrizeValue(Number(e.target.value))}
              className="w-24 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p>{error}</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-xl border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d’inscription</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lots gagnés</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.userName || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.gains.length > 0 ? (
                        <ul className="space-y-2">
                          {user.gains.map((gain, index) => (
                            <li key={index} className="bg-gray-50 p-2 rounded border border-gray-200">
                              🎁 {gain.prizeWon} — {gain.prizeValue} €<br />
                              🎟️ Ticket: #{gain.ticketNumber}<br />
                              📅 {formatDate(gain.createdAt)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 text-sm rounded ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
>>>>>>> df0fa71cbf65b7a5e01c74aa12342c91324b0345
