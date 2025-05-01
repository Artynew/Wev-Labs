import { Box, Paper, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Lab1 from '../pages/Lab1';
import Lab2 from '../pages/Lab2';
import Lab3 from '../pages/Lab3';
import Lab4 from '../pages/Lab4';


const labWorks = [
  { path: '/', element: <Home />, title: "Главная" },
  { path: '/lab1', element: <Lab1 />, title: "Лабораторная работа 1" },
  { path: '/lab2', element: <Lab2 />, title: "Лабораторная работа 2" },
  { path: '/lab3', element: <Lab3 />, title: "Лабораторная работа 3" },
  { path: '/lab4', element: <Lab4 />, title: "Лабораторная работа 4" }
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