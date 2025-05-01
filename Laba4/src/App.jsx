import { Box, CssBaseline, ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';
import { ThemeProvider, ThemeContext } from './context/ThemeContext'; 

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <ThemeContext.Consumer>
          {({ isDarkMode }) => {
            const theme = createTheme({
              palette: {
                mode: isDarkMode ? 'dark' : 'light', // Применяем тёмную или светлую тему
              },
            });

            return (
              <MUIThemeProvider theme={theme}> {}
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
              </MUIThemeProvider>
            );
          }}
        </ThemeContext.Consumer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
