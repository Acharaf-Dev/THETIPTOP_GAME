import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './index.css';

const rootElement = document.getElementById('app');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);



// frontend/src/index.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { AppRoutes } from './AppRoutes';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('app')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   </React.StrictMode>
// );
