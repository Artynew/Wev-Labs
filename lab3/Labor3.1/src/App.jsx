import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
            <Menu />
          </Box>
          <Content />
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;