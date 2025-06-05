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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { fetchMockProjects } from '../mockApi';

const drawerWidth = 240;

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/resources/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setProjects(data);
            return;
          }
        }
        const mock = await fetchMockProjects();
        setProjects(mock);
      } catch {
        const mock = await fetchMockProjects();
        setProjects(mock);
      }
    };
    load();
  }, []);

  const handleAsk = () => {
    fetch('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    }).catch(() => {});
    setQuestion('');
    setCopilotOpen(false);
  };

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
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => setCopilotOpen(true)}
          >
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
            <Grid item xs={12}>
              <Card sx={{ textAlign: 'center', p: 2, mb: 2 }}>
                <Button variant="contained" onClick={() => setCopilotOpen(true)}>
                  Ask the Copilot
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Button variant="outlined" onClick={() => navigate('/kanban')}>
                  View Kanban Board
                </Button>
              </Card>
            </Grid>
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
      <Dialog open={copilotOpen} onClose={() => setCopilotOpen(false)}>
        <DialogTitle>Ask the Copilot</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your question"
            fullWidth
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCopilotOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAsk}>Send</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
