import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import Workers from './pages/Workers';
import Orders from './pages/Orders';
import Notifications from './pages/Notifications';
import Bills from './pages/Bills';
import Suppliers from './pages/Suppliers';
import Layout from './components/Layout';
import CitizenDashboard from './citizen/citizendashboard';

function App() {
  const { initialize, loading, user } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Login route: Redirect if already logged in */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

        {/* Private Routes - Only accessible if user is logged in */}
        <Route
          path="/*"
          element={
            user ? (
              <Layout>
                <Routes>
                  {/* Routes for Manager */}
                  {user.role === 'manager' && (
                    <Route path="/manager" element={<Dashboard />} />
                  )}

                  {/* Routes for Citizen */}
                  {user.role === 'citizen' && (
                    <Route path="/citizendashboard" element={<CitizenDashboard />} />
                  )}

                  {/* Other routes accessible by both user roles */}
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/workers" element={<Workers />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/bills" element={<Bills />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                </Routes>
              </Layout>
            ) : (
              // Redirect to login if not authenticated
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
