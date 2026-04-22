import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Les imports essentiels
import HomePage from './pages/search/HomePage';
import SearchResultsPage from './pages/search/SearchResultsPage';
import MedicamentDetailPage from './pages/search/MedicamentDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/medicaments/:id" element={<MedicamentDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;