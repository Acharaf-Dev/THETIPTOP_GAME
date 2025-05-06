module.exports = {
  testEnvironment: "jsdom", // Simule un environnement navigateur
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transpile JS et JSX avec Babel
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Alias @ vers src/
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",             // Cible tous les fichiers JS/JSX
    "!src/**/*.test.{js,jsx}",      // Exclut les fichiers de test
    "!src/**/index.{js,jsx}",       // Optionnel : exclut les index.js
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text-summary", "html"], // Ajoute lcov pour SonarQube
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
// Ce fichier de configuration Jest est conçu pour un projet React. Il utilise jsdom comme environnement de test pour simuler un navigateur, transpile le code avec Babel, et configure la collecte de couverture de code. Il exclut les fichiers de test et les fichiers index.js de la couverture, et définit des seuils de couverture globaux. Les rapports de couverture sont générés au format lcov, texte résumé et HTML. Les tests sont recherchés dans les répertoires __tests__ ou avec les suffixes .spec ou .test.