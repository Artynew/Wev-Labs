import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const labs = [
  { id: 1, title: "Лабораторная 1", path: "/lab1" },
  { id: 2, title: "Лабораторная 2", path: "/lab2" },
  { id: 3, title: "Лабораторная 3", path: "/lab3" },
  { id: 0, title: "Главная", path: "/" }
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

/*<Routes>
<Route path="/" element={<Home />} />
<Route path="/lab1" element={<Lab1 />} />
<Route path="/lab2" element={<Lab2 />} />
<Route path="/lab3" element={<Lab3 />} />
<Route path="/about" element={<About />} />
</Routes>*/