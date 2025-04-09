module.exports = {
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",
      "!src/index.js" // Exclut le fichier d'entrée si tu le souhaites
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
  };
  