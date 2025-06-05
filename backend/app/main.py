from fastapi import FastAPI, HTTPException
from typing import List
from .schemas import (
    User,
    Project,
    Task,
    Message,
    UserCreate,
    ProjectCreate,
    TaskCreate,
    MessageCreate,
)

app = FastAPI(title="AI Copilot Backend", version="0.1")

# In-memory stores - placeholder for database
users: List[User] = []
projects: List[Project] = []
tasks: List[Task] = []
messages: List[Message] = []

# simple id counters
user_counter = 1
project_counter = 1
task_counter = 1
message_counter = 1

@app.get("/context")
def context_summary():
    return {
        "projects": len(projects),
        "tasks": len(tasks),
        "users": len(users),
        "messages": len(messages),
    }

@app.get("/resources/users", response_model=List[User])
def list_users():
    return users


@app.post("/resources/users", response_model=User, status_code=201)
def create_user(user: UserCreate):
    global user_counter
    new_user = User(id=user_counter, **user.dict())
    user_counter += 1
    users.append(new_user)
    return new_user


@app.get("/resources/users/{user_id}", response_model=User)
def get_user(user_id: int):
    for u in users:
        if u.id == user_id:
            return u
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/resources/projects", response_model=List[Project])
def list_projects():
    return projects


@app.post("/resources/projects", response_model=Project, status_code=201)
def create_project(project: ProjectCreate):
    global project_counter
    new_project = Project(id=project_counter, **project.dict())
    project_counter += 1
    projects.append(new_project)
    return new_project


@app.get("/resources/projects/{project_id}", response_model=Project)
def get_project(project_id: int):
    for p in projects:
        if p.id == project_id:
            return p
    raise HTTPException(status_code=404, detail="Project not found")

@app.get("/resources/tasks", response_model=List[Task])
def list_tasks():
    return tasks


@app.post("/resources/tasks", response_model=Task, status_code=201)
def create_task(task: TaskCreate):
    global task_counter
    new_task = Task(id=task_counter, **task.dict())
    task_counter += 1
    tasks.append(new_task)
    return new_task


@app.get("/resources/tasks/{task_id}", response_model=Task)
def get_task(task_id: int):
    for t in tasks:
        if t.id == task_id:
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@app.get("/resources/messages", response_model=List[Message])
def list_messages():
    return messages


@app.post("/resources/messages", response_model=Message, status_code=201)
def create_message(message: MessageCreate):
    global message_counter
    new_message = Message(id=message_counter, **message.dict())
    message_counter += 1
    messages.append(new_message)
    return new_message


@app.get("/resources/messages/{message_id}", response_model=Message)
def get_message(message_id: int):
    for m in messages:
        if m.id == message_id:
            return m
    raise HTTPException(status_code=404, detail="Message not found")

@app.post("/events")
def ingest_event(event: dict):
    # Placeholder for event ingestion logic
    return {"status": "received", "payload": event}
