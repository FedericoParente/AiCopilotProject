from fastapi import FastAPI
from typing import List
from .schemas import User, Project, Task, Message

app = FastAPI(title="AI Copilot Backend", version="0.1")

# In-memory stores - placeholder for database
users: List[User] = []
projects: List[Project] = []
tasks: List[Task] = []
messages: List[Message] = []

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

@app.get("/resources/projects", response_model=List[Project])
def list_projects():
    return projects

@app.get("/resources/tasks", response_model=List[Task])
def list_tasks():
    return tasks

@app.get("/resources/messages", response_model=List[Message])
def list_messages():
    return messages

@app.post("/events")
def ingest_event(event: dict):
    # Placeholder for event ingestion logic
    return {"status": "received", "payload": event}
