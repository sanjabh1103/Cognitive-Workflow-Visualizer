import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { CreateDecision } from './pages/CreateDecision';
import { DecisionDetail } from './pages/DecisionDetail';
import { PendingFeatures } from './pages/PendingFeatures';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateDecision />} />
          <Route path="/decision/:id" element={<DecisionDetail />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/community" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/pending-features" element={<PendingFeatures />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;