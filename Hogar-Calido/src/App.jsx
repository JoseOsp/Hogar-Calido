import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PanelAdmin } from './pages/PanelAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<PanelAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;