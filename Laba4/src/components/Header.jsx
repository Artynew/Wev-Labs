import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Проверь путь к ThemeContext

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext); // Доступ к функции toggleTheme

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Лабораторные работы по React</Typography>
        <Button color="inherit" onClick={toggleTheme}>Переключить тему</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
