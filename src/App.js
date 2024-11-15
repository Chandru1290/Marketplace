// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Payment from './Pages/Payment/Payment';
import { Login } from './Components/Login/Login';
import { SignUp } from './Components/SignUp/SignUp';
import { Home } from './Pages/Home/Home';
import { Profile } from './Pages/Profile/Profile';
import { ViewProduct } from './Pages/ViewProduct/ViewProduct';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/product/:productId" element={isAuthenticated ? <ViewProduct /> : <Navigate to="/login" />} />
            <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
