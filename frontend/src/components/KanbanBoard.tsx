import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Task {
  id: number;
  name: string;
  status: string;
}

const statuses = ['To Do', 'In Progress', 'Review', 'Done'];

const initialTasks: Task[] = [
  { id: 1, name: 'Design UI', status: 'To Do' },
  { id: 2, name: 'Set up backend', status: 'In Progress' },
  { id: 3, name: 'Write tests', status: 'Review' },
  { id: 4, name: 'Deploy to production', status: 'Done' },
];

interface TaskItemProps {
  task: Task;
  onUpdateName: (id: number, newName: string) => void;
  onDragStart: (id: number) => void;
}

function TaskItem({ task, onUpdateName, onDragStart }: TaskItemProps) {
  const [open, setOpen] = useState(false);
  const [tempName, setTempName] = useState(task.name);

  const handleSave = () => {
    onUpdateName(task.id, tempName.trim() || task.name);
    setOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ cursor: 'grab', mb: 1 }}
        draggable
        onDragStart={() => onDragStart(task.id)}
        onClick={() => setOpen(true)}
      >
        <CardContent sx={{ p: 1 }}>
          <Typography>{task.name}</Typography>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            type="text"
            fullWidth
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const updateTaskName = (id: number, newName: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, name: newName } : t)));
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrop = (status: string) => {
    if (draggedId === null) return;
    setTasks((prev) => prev.map((t) => (t.id === draggedId ? { ...t, status } : t)));
    setDraggedId(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2, overflowX: 'auto' }}>
        {statuses.map((status) => (
          <Box
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
            sx={{ width: 260, minHeight: 300, bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              {status}
            </Typography>
            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdateName={updateTaskName}
                  onDragStart={handleDragStart}
                />
              ))}
          </Box>
        ))}
      </Box>
  );
}
