import React, { useState } from 'react';
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

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Handler for drag-and-drop end event
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    // If dropped in same column, do nothing
    if (source.droppableId === destination.droppableId) return;

    // Update task status based on destination column
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
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          {task.name}
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
