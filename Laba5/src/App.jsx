// App.js
import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLoginState } from './hooks/useLoginState';
import AuthForm from './components/AuthForm';
import RegistrationForm from './components/RegistrationForm';
import Feedback from './components/Feedback';
import Profile from './components/Profile';
import Home from './components/Home';

function App() {
  const { isLoggedIn, login, logout } = useLoginState();

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Profile logout={logout} />}
        
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/" /> : <AuthForm login={login} />} 
          />
          <Route 
            path="/register" 
            element={isLoggedIn ? <Navigate to="/" /> : <RegistrationForm />} 
          />
          <Route 
            path="/feedback" 
            element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
