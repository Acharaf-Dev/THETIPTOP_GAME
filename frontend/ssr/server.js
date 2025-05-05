require('dotenv').config({ path: './frontend/ssr/.env.ssr' });

const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { AppRoutes } = require('../src/AppRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Redirections permanentes (301)
const redirects = {
  '/ancienne-page': '/',
  '/old-login': '/login',
  '/home': '/',
};

app.use((req, res, next) => {
  const target = redirects[req.path];
  if (target) return res.redirect(301, target);
  next();
});

// Sert les fichiers statiques
app.use(express.static(path.resolve(__dirname, '../build')));

// SSR Fallback
app.get('*', (req, res) => {
  const context = {};
  const appHTML = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context },
      React.createElement(AppRoutes)
    )
  );

  const indexFile = path.resolve(__dirname, '../build/index.html');
  fs.readFile(indexFile, 'utf8', (err, htmlData) => {
    if (err) {
      return res.status(500).send('Erreur lors du chargement du HTML');
    }

    return res.send(
      htmlData.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`✅ SSR Server running on http://localhost:${PORT}`);
});
