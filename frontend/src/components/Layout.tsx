import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}
