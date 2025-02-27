import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FitnessProvider } from './context/FitnessContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Goals from './pages/Goals';
import FamilyMembers from './pages/FamilyMembers';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <FitnessProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<Layout />}>
              <Route index element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="activities" element={
                <ProtectedRoute>
                  <Activities />
                </ProtectedRoute>
              } />
              
              <Route path="goals" element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              } />
              
              <Route path="family" element={
                <ProtectedRoute adminOnly>
                  <FamilyMembers />
                </ProtectedRoute>
              } />
              
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FitnessProvider>
    </AuthProvider>
  );
}

export default App;