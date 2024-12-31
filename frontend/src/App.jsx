import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import HomePage from './pages/Home';
import SaveAddress from './pages/Address';
import AddressManagement from './pages/AddressManagement';

function App() {
  return (
    <>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/save-address" element={<SaveAddress />} />
          <Route path="/manage-address" element={<AddressManagement />} />

        </Routes>
    </>
  );
}

export default App;
