import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, bgcolor: 'primary.main', color: 'white' }}>
      <Typography align="center">© Лабораторные работы</Typography>
    </Box>
  );
};

export default Footer;