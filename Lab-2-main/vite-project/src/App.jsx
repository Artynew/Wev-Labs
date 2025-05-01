import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  let pagestart = <Home />;

  
  

  if (currentPage == 'home'){
    pagestart = <Home />;
  }
  if(currentPage == 'about'){
    pagestart = <About />;
  }
  
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Navigation onNavigate={setCurrentPage} />
      {pagestart}
    </div>
  );
};

export default App;