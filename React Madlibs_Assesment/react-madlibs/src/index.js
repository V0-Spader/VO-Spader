import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom";
import Scunthorpe from './routes/Scunthorpe';
import Cupertino from './routes/Cupertino';
import PredicitiveText from './routes/PredictiveText';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="scunthorpe" element={<Scunthorpe />} />
      <Route path="cupertino" element={<Cupertino />} />
      <Route path="predictiveText" element={<PredicitiveText />} />
      <Route
        path="*"
        element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
