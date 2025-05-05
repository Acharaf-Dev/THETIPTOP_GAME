# Thé Tip Top - Jeu Concours 🎡

## 📌 Description
Thé Tip Top est un site fictif conçu pour un jeu concours en ligne. 
Les utilisateurs peuvent s'inscrire, jouer à une roue de la fortune et gagner des lots tout en disposant d'un code de jeu !

## 🚀 Installation
1. **Cloner le projet**  
git clone https://github.com/Acharaf-Dev/THETIPTOP_GAME.git
cd thetiptop

2. **Installer les dépendances**  
npm install

3. **Exécuter Docker Compose**
**Installer docker sous Linux** 
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
docker --version

**Installer docker_compose sous Linux**
sudo curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

**Construire et exécuter les conteneurs**
docker-compose up --build

4. **Lancer le projet**  
npm install
npm start

## Accéder en ligne ou en Localhost via les port de configuration du docker-compose

**En Localhost**
- FRONTEND : http://localhost:3001/
- BACKEND : http://localhost:4000/
- MONGODB : http://localhost:27017/
- JENKINS : http://localhost:8080/
- SONARQUBE : http://localhost:9000/
- PROMETHEUS : http://localhost:9090/
- GRAFANA : http://localhost:3000/
- cADVISOR : http://localhost:8081/
- TRAEFIK : http://localhost:8081/

**SUR VPS**
- FRONTEND : http://161.97.76.223:3001/
- BACKEND : http://161.97.76.223:4000/
- MONGODB : http://161.97.76.223:27017/
- JENKINS : http://161.97.76.223:8080/
- SONARQUBE : http://161.97.76.223:9000/
- PROMETHEUS : http://161.97.76.223:9090/
- GRAFANA : http://161.97.76.223:3000/
- cADVISOR : http://161.97.76.223:8081/
- TRAEFIK : http://161.97.76.223:8081/

**SOUS NOM DE DOMAINE DU WORKFLOW**
- JENKINS : https://www.jenkins.wk-archi-f24a-15M-G8.fr 
- SONARQUBE : https://www.sonarqube.wk-archi-f24a-15M-G8.fr
- PROMETHEUS : https://www.prometheus.wk-archi-f24a-15M-G8.fr
- GRAFANA : https://www.grafana.wk-archi-f24a-15M-G8.fr

**NOM DE DOMAINE DU SITE WEB**
 https://www.dsp5-archi-f24a-15M.G8.fr

**NOM DES BRANCHES**
- main "la branche par défaut ou principale qui est notre branche de production"
- preprod "Notre branche de préproduction"
- develop "C'est notre branche de développement local et de test"

**BONNES PRATIQUES EN TANT QUE DEVELOPPEUR**
- Je crée un ticket avec un nom court ex ( Ticket-01) : (developpeur)
- Depuis mon terminal, je me place sur develop : " git checkout origin develop "
- Je récupère la dernière version de develop : " git pull origin  develop "
- Je vérifie l'état actuel de mon dépot : "git status"
- Je crée une nouvelle branche avant de travailler en fonction du ticket
- Je me place sur la nouvelle branche et je travaille : (developpeur)
        git checkout - b Ticket-01
        git add .
        git commit -m "Ajout de la nouvelle fonctionnalité"
        git push origin Ticket-01
- Je crée une pull request sur GitHub pour fusionner test dans develop.
- Je revoie et validation de la pull request sur GitHub.
- Je fusionne la branche develop dans preprod : (Admin)
        git checkout preprod
        git merge develop
        git push origin preprod
- Je crée une pull request sur GitHub pour fusionner preprod dans main. (Admin)
- Revue et validation de la pull request sur GitHub.
- Je fusionne la branche main :
        git checkout main
        git merge preprod
        git push origin main
- Je reviens à la branche develop et la mettre à jour :
        git checkout develop
        git pull origin main
- Je supprime la branche temporaire si je veux :
git branch -d Ticket-01
git push origin --delete Ticket-01
- Je crée une nouvelle branche si je dois developper une nouvelle fonctionnalité "git checkout -b Ticket-02"
- Répétez ce processus pour chaque nouvelle fonctionnalité. 

**Arborescence projet**

```
THETIPTOP_GAME/
├── backend/                          # Code backend
│   ├── config/                       # Configuration
│   │   ├── auth.js                   # Configuration d'authentification
│   │   ├── db.js                     # Configuration de la base de données
│   │   ├── transporter.js            # Configuration pour l'envoi d'emails
│   ├── controllers/                  # Logique métier
│   │   ├── userController.js         # Contrôleur pour les utilisateurs
│   │   ├── gameController.js         # Contrôleur pour les jeux
│   │   ├── contactController.js      # Contrôleur pour les contacts
│   ├── middleware/                   # Middlewares
│   │   ├── authMiddleware.js         # Middleware d'authentification
│   │   ├── userTypeMiddleware.js     # Middleware pour les types d'utilisateurs
│   ├── models/                       # Modèles de données
│   │   ├── usersModel.js             # Modèle pour les utilisateurs
│   │   ├── gainsModel.js             # Modèle pour les gains
│   │   ├── winningTicket.js          # Modèle pour les tickets gagnants
│   ├── routes/                       # Routes API
│   │   ├── authRoute.js              # Routes pour l'authentification
│   │   ├── gameRoute.js              # Routes pour les jeux
│   │   ├── contactRoute.js           # Routes pour les contacts
│   ├── script/                       # Scripts utilitaires
│   │   ├── protect-branches.sh       # Script pour protéger les branches Git
│   ├── tests/                        # Tests backend
│   │   ├── auth.test.js              # Tests pour l'authentification
│   │   ├── game.test.js              # Tests pour les jeux
│   ├── coverage/                     # Rapports de couverture de tests
│   │   ├── lcov-report/              # Rapport HTML
│   │   ├── coverage-final.json       # Rapport JSON
│   │   ├── clover.xml                # Rapport XML
│   ├── server.js                     # Point d'entrée du serveur
│   ├── package.json                  # Dépendances backend
│   ├── Dockerfile                    # Dockerfile pour le backend
├── frontend/                         # Nouveau code frontend
│   ├── .env                          # Variables d'environnement
│   ├── .env.dev                      # Variables d'environnement pour le développement
│   ├── .env.preprod                  # Variables d'environnement pour la préproduction
│   ├── .env.prod                     # Variables d'environnement pour la production
│   ├── .eslintrc.json                # Configuration ESLint
│   ├── .gitignore                    # Fichiers/dossiers à ignorer par Git
│   ├── babel.config.js               # Configuration Babel
│   ├── Dockerfile.dev                # Dockerfile pour le développement
│   ├── Dockerfile.prod               # Dockerfile pour la production
│   ├── eslint.config.mjs             # Configuration ESLint en module
│   ├── generate-sitemap.js           # Script pour générer le sitemap
│   ├── jest.config.js                # Configuration Jest pour les tests
│   ├── nginx.conf                    # Configuration Nginx
│   ├── package.json                  # Dépendances frontend
│   ├── postcss.config.js             # Configuration PostCSS
│   ├── README.md                     # Documentation du frontend
│   ├── tailwind.config.js            # Configuration Tailwind CSS
│   ├── test-Jenkinsfile.txt          # Fichier de test pour Jenkins
│   ├── vitest.config.js              # Configuration Vitest
│   ├── build/                        # Fichiers générés après build
│   │   ├── asset-manifest.json       # Manifest des assets
│   │   ├── favicon.ico               # Icône du site
│   │   ├── index.html                # Fichier HTML principal
│   │   ├── manifest.json             # Manifest du site
│   │   ├── robots.txt                # Fichier robots.txt
│   │   ├── sitemap.xml               # Sitemap du site
│   │   ├── images/                   # Images générées
│   │   └── static/                   # Fichiers statiques
│   │       ├── css/                  # Fichiers CSS
│   │       ├── js/                   # Fichiers JavaScript
│   │       └── media/                # Fichiers médias
│   ├── public/                       # Fichiers publics
│   │   ├── favicon.ico               # Icône du site
│   │   ├── index.html                # Fichier HTML principal
│   │   ├── manifest.json             # Manifest du site
│   │   ├── robots.txt                # Fichier robots.txt
│   │   ├── sitemap.xml               # Sitemap du site
│   │   └── images/                   # Images publiques
│   └── src/                          # Code source React
│       ├── AppRoutes.jsx                   # Composant principal
│       ├── index.css                 # Styles globaux
│       ├── index.jsx                 # Point d'entrée React
│       ├── assets/                   # Assets (images, icônes, etc.)
│       │   ├── images/               # Images
│       │   ├── icons/                # Icônes
│       ├── components/               # Composants réutilisables
│       │   ├── Footer.jsx            # Pied de page
│       │   ├── Header.jsx            # En-tête
│       │   ├── ProtectedRoute.jsx    # Route protégée
│       │   ├── DashboardLayout.jsx   # Layout pour le tableau de bord
│       ├── pages/                    # Pages principales
│       │   ├── About/                # Page "À propos"
│       │   │   ├── About.jsx         # Composant "À propos"
│       │   ├── Confidentialite/      # Pages de confidentialité
│       │   │   ├── Cgu.jsx           # Conditions générales d'utilisation
│       │   │   ├── Cgv.jsx           # Conditions générales de vente
│       │   │   ├── Mention.jsx       # Mentions légales
│       │   │   ├── Politique.jsx     # Politique de confidentialité
│       │   ├── Contact/              # Page de contact
│       │   │   ├── Contact.jsx       # Composant "Contact"
│       │   ├── Dashbords/            # Tableaux de bord
│       │   │   ├── AdminDashboard.jsx # Tableau de bord admin
│       │   │   ├── ClientDashboard.jsx # Tableau de bord client
│       │   │   ├── EmployeeDashboard.jsx # Tableau de bord employé
│       │   ├── Game/                 # Page de jeu
│       │   │   ├── Game.jsx          # Composant "Jeu"
│       │   ├── Grandgagnant/         # Page des grands gagnants
│       │   │   ├── Grandgagnant.jsx  # Composant "Grands gagnants"
│       │   ├── Home/                 # Page d'accueil
│       │   │   ├── Home.jsx          # Composant "Accueil"
│       │   ├── Login/                # Page de connexion
│       │   │   ├── Login.jsx         # Composant "Connexion"
│       │   ├── Password/             # Gestion des mots de passe
│       │   │   ├── ForgotPassword.jsx # Mot de passe oublié
│       │   ├── Register/             # Page d'inscription
│       │   │   ├── Register.jsx      # Composant "Inscription"
│       ├── styles/                   # Fichiers de styles
│       │   ├── style.css             # Styles globaux
├── docs/                             # Documentation
│   ├── architecture.md               # Documentation sur l'architecture
│   ├── api-documentation.md          # Documentation des API
├── .env                              # Variables d'environnement globales
├── docker-compose.yml                # Configuration Docker Compose
├── Jenkinsfile                       # Pipeline Jenkins
├── README.md                         # Documentation principale
└── teamRoadmap.md                    # Feuille de route de l'équipe
```
---

thanks 