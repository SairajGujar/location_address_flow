import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';

function App() {
  return (
    <>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
    </>
  );
}

export default App;
