import { Box, Paper, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Lab1 from '../pages/Lab1';
import Lab2 from '../pages/Lab2';
import Lab3 from '../pages/Lab3';
import Home from '../pages/Home';


const labWorks = [
  {
    path: "/lab1",
    element: <Lab1 />,
    title: "Лабораторная работа 1"
  },
  {
    path: "/lab2", 
    element: <Lab2 />,
    title: "Лабораторная работа 2"
  },
  {
    path: "/lab3",
    element: <Lab3 />,
    title: "Лабораторная работа 3"
  },
  {
    path: "/",
    element: <Home />,
    title: "Главная"
  }
];

const Content = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Routes>
          {labWorks.map((lab) => (
            <Route 
              key={lab.path} 
              path={lab.path} 
              element={lab.element} 
            />
          ))}
        </Routes>
      </Paper>
    </Box>
  );
};

export default Content;