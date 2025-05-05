import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import AppRoutes from '../src/AppRoutes';

export function render(url) {
  return (
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}
