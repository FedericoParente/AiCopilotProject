import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';

interface Project {
  id: number;
  name: string;
  members: number[];
}

const drawerWidth = 240;

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/resources/projects')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
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
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Button variant="contained" fullWidth sx={{ mb: 2 }}>
            Ask the Copilot
          </Button>
          <List>
            <ListItem button>
              <ListItemText primary="Ask about project risks" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Start a retrospective" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mr: `${drawerWidth}px` }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {projects.map((project) => {
              const progress = Math.floor(Math.random() * 80) + 10;
              return (
                <Grid item xs={12} md={6} lg={4} key={project.id}>
                  <Card>
                    <CardHeader
                      title={project.name}
                      action={<Chip label="Active" color="success" size="small" />}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
                      </Box>
                      <AvatarGroup max={4} sx={{ mb: 1 }}>
                        {project.members.map((m) => (
                          <Avatar key={m}>{m}</Avatar>
                        ))}
                      </AvatarGroup>
                      <Typography variant="body2" color="text.secondary">
                        4 overdue, 2 stalled
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained">
                        Open Project
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
