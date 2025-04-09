module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "coverage",
      outputName: "test-report.xml"
    }]
  ]
};
