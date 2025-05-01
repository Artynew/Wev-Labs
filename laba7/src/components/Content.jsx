import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Profile from './Profile';
import AboutPage from './AboutPage';
import Lab1Page from './Lab1Page';
import Lab2Page from './Lab2Page';
import Lab3Page from './Lab3Page';
import FeedbackList from './FeedbackList';
import SupportPage from './SupportPage';
import { useSelector } from 'react-redux';

export default function Content() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.isLogin);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && (
          <>
            <Header 
              darkMode={darkMode} 
              toggleTheme={() => setDarkMode(!darkMode)}
              toggleMenu={() => setMenuOpen(!menuOpen)}
            />
            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          </>
        )}
        
        <main style={{ 
          padding: '20px',
          paddingBottom: isAuthenticated ? '80px' : '0',
          minHeight: 'calc(100vh - 60px)'
        }}>
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" />
            } />

            {/* Авторизация */}
            <Route path="/login" element={
              !isAuthenticated ? <LoginForm /> : <Navigate to="/" />
            } />

            {/* Регистрация */}
            <Route path="/register" element={
              !isAuthenticated ? <RegisterForm /> : <Navigate to="/" />
            } />

            {/* Защищенные маршруты */}
            {isAuthenticated && (
              <>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/lab1" element={<Lab1Page />} />
                <Route path="/lab2" element={<Lab2Page />} />
                <Route path="/lab3" element={<Lab3Page />} />
                <Route path="/feedback" element={<FeedbackList />} />
                <Route path="/support" element={<SupportPage />} />
              </>
            )}

            {/* Резервный редирект */}
            <Route path="*" element={
              <Navigate to={isAuthenticated ? "/" : "/login"} />
            } />
          </Routes>
        </main>

        {isAuthenticated && <Footer />}
      </Router>
    </ThemeProvider>
  );
}
