# Thé Tip Top - Jeu Concours 🎡

## 📌 Description
Thé Tip Top est un site fictif conçu pour un jeu concours en ligne.  
Les utilisateurs peuvent s'inscrire, jouer à une roue de la fortune et gagner des lots tout en disposant d'un code de jeu !

---

## 📖 Table des matières
1. [Installation](#-installation)
2. [Accès](#-accès)
3. [Workflow Git](#-workflow-git)
4. [Arborescence du projet](#-arborescence-du-projet)
5. [Bonnes pratiques](#-bonnes-pratiques)
6. [Liens utiles](#-liens-utiles)

---

## 🚀 Installation
### 1. Cloner le projet
```bash
git clone https://github.com/Acharaf-Dev/THETIPTOP_GAME.git
cd thetiptop
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Exécuter Docker Compose
#### Installer Docker sous Linux
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
docker --version
```

#### Installer Docker Compose sous Linux
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

#### Construire et exécuter les conteneurs
```bash
docker-compose up --build
```

### 4. Lancer le projet
```bash
npm start
```

---

## 🌐 Accès
### En Localhost
- **Frontend** : [http://localhost:3001/](http://localhost:3001/)
- **Backend** : [http://localhost:4000/](http://localhost:4000/)
- **MongoDB** : [http://localhost:27017/](http://localhost:27017/)
- **Jenkins** : [http://localhost:8080/](http://localhost:8080/)
- **SonarQube** : [http://localhost:9000/](http://localhost:9000/)
- **Prometheus** : [http://localhost:9090/](http://localhost:9090/)
- **Grafana** : [http://localhost:3000/](http://localhost:3000/)
- **cAdvisor** : [http://localhost:8081/](http://localhost:8081/)
- **Traefik** : [http://localhost:8081/](http://localhost:8081/)

### Sur VPS
- **Frontend** : [http://161.97.76.223:3001/](http://161.97.76.223:3001/)
- **Backend** : [http://161.97.76.223:4000/](http://161.97.76.223:4000/)
- **MongoDB** : [http://161.97.76.223:27017/](http://161.97.76.223:27017/)
- **Jenkins** : [http://161.97.76.223:8080/](http://161.97.76.223:8080/)
- **SonarQube** : [http://161.97.76.223:9000/](http://161.97.76.223:9000/)
- **Prometheus** : [http://161.97.76.223:9090/](http://161.97.76.223:9090/)
- **Grafana** : [http://161.97.76.223:3000/](http://161.97.76.223:3000/)
- **cAdvisor** : [http://161.97.76.223:8081/](http://161.97.76.223:8081/)
- **Traefik** : [http://161.97.76.223:8081/](http://161.97.76.223:8081/)

---

## 🔄 Workflow Git
1. Créer un ticket avec un nom court (ex : `Ticket-01`).
2. Depuis le terminal, se placer sur la branche `develop` :
   ```bash
   git checkout origin develop
   git pull origin develop
   git status
   ```
3. Créer une nouvelle branche pour le ticket :
   ```bash
   git checkout -b Ticket-01
   ```
4. Ajouter et valider les modifications :
   ```bash
   git add .
   git commit -m "Ajout de la nouvelle fonctionnalité"
   git push origin Ticket-01
   ```
5. Créer une pull request sur GitHub pour fusionner dans `develop`.
6. Fusionner les branches selon le workflow :
   - `develop` → `preprod`
   - `preprod` → `main`
7. Mettre à jour la branche `develop` :
   ```bash
   git checkout develop
   git pull origin main
   ```
8. Supprimer la branche temporaire si nécessaire :
   ```bash
   git branch -d Ticket-01
   git push origin --delete Ticket-01
   ```

---

## 📂 Arborescence du projet
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

## ✅ Bonnes pratiques
- Toujours créer une branche pour chaque nouvelle fonctionnalité ou correction.
- Respecter le workflow Git décrit ci-dessus.
- Documenter les modifications dans les pull requests.
- Maintenir une couverture de tests élevée.

---

## 🔗 Liens utiles
- **Nom de domaine du workflow** :
  - Jenkins : [https://www.jenkins.wk-archi-f24a-15M-G8.fr](https://www.jenkins.wk-archi-f24a-15M-g8.fr)
  - SonarQube : [https://www.sonarqube.wk-archi-f24a-15M-G8.fr](https://www.sonarqube.wk-archi-f24a-15M-g8.fr)
  - Prometheus : [https://www.prometheus.wk-archi-f24a-15M-G8.fr](https://www.prometheus.wk-archi-f24a-15M-g8.fr)
  - Grafana : [https://www.grafana.wk-archi-f24a-15M-G8.fr](https://www.grafana.wk-archi-f24a-15M-g8.fr)
- **Nom de domaine du site web** :  
  [https://www.dsp5-archi-f24a-15M.G8.fr](https://www.dsp5-archi-f24a-15M.g8.fr)

---
