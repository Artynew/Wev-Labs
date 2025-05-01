import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const labs = [
  { id: 0, title: "Главная", path: "/" },
  { id: 1, title: "Лабораторная 1", path: "/lab1" },
  { id: 2, title: "Лабораторная 2", path: "/lab2" },
  { id: 3, title: "Лабораторная 3", path: "/lab3" },
  { id: 4, title: "Лабораторная 4", path: "/lab4" }
];

const Menu = () => {
  const navigate = useNavigate();
  
  return (
    <List>
      {labs.map((lab) => (
        <ListItem key={lab.id} disablePadding>
          <ListItemButton onClick={() => navigate(lab.path)}>
            <ListItemText primary={lab.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;
