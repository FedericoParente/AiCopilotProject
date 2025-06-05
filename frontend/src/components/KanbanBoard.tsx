import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: number;
  name: string;
  status: string;
}

const statuses = ['To Do', 'In Progress', 'Review', 'Done'];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/resources/tasks')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setTasks(data))
      .catch(() => setTasks([]));
  }, []);

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
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
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
