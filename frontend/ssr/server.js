require('@babel/register')({
  extensions: ['.js', '.jsx'], // Permet de transpiler les fichiers .js et .jsx
});
// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import AppRoutes from '../src/AppRoutes';

// frontend/ssr/server.js
// Importer les modules nécessaires pour le serveur
// Convertir import en require
const express = require('express');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const AppRoutes = require('../src/AppRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

const staticDir = path.resolve(__dirname, '../build');
const htmlFilePath = path.join(staticDir, 'index.html');

app.use(express.static(staticDir));

app.get('*', (req, res) => {
  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('❌ Erreur lecture HTML :', err);
      return res.status(500).send('Erreur lors du chargement du HTML');
    }

    const jsx = (
      <StaticRouter location={req.url}>
        <AppRoutes />
      </StaticRouter>
    );

    const reactHtml = ReactDOMServer.renderToString(jsx);

    const finalHtml = htmlData.replace(
      '<div id="app"></div>',
      `<div id="app">${reactHtml}</div>`
    ).replace(
      '<div id="root"></div>',
      `<div id="root">${reactHtml}</div>`
    );

    res.send(finalHtml);
  });
});

app.listen(PORT, () => {
  console.log(`✅ SSR Server running at http://localhost:${PORT}`);
});

