import React from 'react'; // Ajouter l'importation de React
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";

describe('Home component', () => {
  // Test 1: Vérifier que le titre et le sous-titre sont affichés
  test('renders the title and subtitle', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Vérifier que le titre est rendu
    const title = screen.getByText(/Jeu Concours Thé Tip Top 100 % gagnant/i);
    expect(title).toBeInTheDocument();

    // Vérifier que le sous-titre est rendu
    const subtitle = screen.getByText(/Participez et remportez des cadeaux exclusifs/i);
    expect(subtitle).toBeInTheDocument();
  });

  // Test 2: Vérifier que le bouton "Jouer Maintenant" existe et est cliquable
  test('renders the "Jouer Maintenant" button and clicks it', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const button = screen.getByRole('button', { name: /Jouer Maintenant/i });
    expect(button).toBeInTheDocument();

    // Simuler un clic sur le bouton
    fireEvent.click(button);
  });

  // Test 3: Vérifier que les lots sont bien affichés
  test('renders the prizes section correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Vérifier si les lots sont bien rendus
    const prizes = screen.getAllByRole('img');
    expect(prizes).toHaveLength(6); // Il y a 6 images de lots (pas 5)
  });
});
