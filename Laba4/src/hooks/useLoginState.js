import { useState, useEffect } from 'react';

export const useLoginState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email) => {
    localStorage.setItem('user', email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};
