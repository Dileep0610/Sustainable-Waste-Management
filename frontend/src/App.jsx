import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import WasteScanner from './pages/WasteScanner';
import CollectionCenters from './pages/CollectionCenters';
import ScanHistory from './pages/ScanHistory';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="centers" element={<CollectionCenters />} />
              <Route path="about" element={<About />} />
              
              <Route path="scanner" element={<ProtectedRoute><WasteScanner /></ProtectedRoute>} />
              <Route path="history" element={<ProtectedRoute><ScanHistory /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
