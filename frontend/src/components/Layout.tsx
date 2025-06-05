import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Copilot
          </Typography>
          <IconButton color="inherit" size="large">
            <Brightness4Icon />
          </IconButton>
          <IconButton color="inherit" size="large">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" size="large">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </Box>
  );
}
