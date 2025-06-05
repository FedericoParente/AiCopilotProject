import React, { useState, ReactNode } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: number;
  name: string;
  status: string;
}

const statuses = ['To Do', 'In Progress', 'Review', 'Done'];

// Sample tasks for testing
const initialTasks: Task[] = [
  { id: 1, name: 'Design UI', status: 'To Do' },
  { id: 2, name: 'Set up backend', status: 'In Progress' },
  { id: 3, name: 'Write tests', status: 'Review' },
  { id: 4, name: 'Deploy to production', status: 'Done' },
];

// Props for a customizable task item
interface TaskItemProps {
  task: Task;
}

// Mock TaskItem component to be customized later
function TaskItem({ task }: TaskItemProps) {
  // Render logic can be replaced with custom UI
  return (
    <div className="bg-white p-2 mb-2 rounded shadow">
      <strong>{task.name}</strong>
    </div>
  );
}

type KanbanBoardProps = {
  renderTask?: (task: Task) => ReactNode;
};

export default function KanbanBoard({ renderTask }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Use provided renderer or default TaskItem
  const renderTaskNode = (task: Task) => {
    return renderTask ? renderTask(task) : <TaskItem task={task} />;
  };

  // Handler for drag-and-drop end event
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id.toString() === draggableId ? { ...t, status: destination.droppableId } : t
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className="bg-gray-100 p-2 rounded w-56 min-h-[10rem]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-semibold text-center mb-2">{status}</h2>
                {tasks
                  .filter((t) => t.status === status)
                  .map((task, index) => (
                    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                      {(providedDraggable) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                        >
                          {renderTaskNode(task)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
