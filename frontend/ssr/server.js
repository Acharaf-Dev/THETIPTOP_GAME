import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import { StaticRouter } from 'react-router-dom/server';

// Load environment variables from .env.ssr
dotenv.config({ path: path.resolve('./frontend/.env.ssr') });

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static files from the CRA build
app.use('/static', express.static(path.resolve(__dirname, '../build/static')));
app.use('/assets', express.static(path.resolve(__dirname, '../build/assets')));

// Handle all GET requests
app.get('*', (req, res) => {
  const indexPath = path.resolve(__dirname, '../build/index.html');

  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('❌ Failed to read index.html', err);
      return res.status(500).send('Internal server error');
    }

    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );

    const finalHtml = htmlData.replace(
      '<div id="root"></div>',
      `<div id="root">${markup}</div>`
    );

    return res.send(finalHtml);
  });
});

app.listen(PORT, () => {
  console.log(`✅ SSR server running at http://localhost:${PORT}`);
});
