from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class User(BaseModel):
    id: int
    email: str
    name: str
    role: str


class UserCreate(BaseModel):
    email: str
    name: str
    role: str

class Project(BaseModel):
    id: int
    name: str
    created: datetime
    deadline: Optional[datetime]
    owner: int
    members: List[int] = []


class ProjectCreate(BaseModel):
    name: str
    created: datetime
    deadline: Optional[datetime]
    owner: int
    members: List[int] = []

class Task(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    status: str
    assignedTo: Optional[int] = None
    dependencies: List[int] = []
    contextProject: int


class TaskCreate(BaseModel):
    name: str
    description: Optional[str] = None
    status: str
    assignedTo: Optional[int] = None
    dependencies: List[int] = []
    contextProject: int

class Message(BaseModel):
    id: int
    sender: int
    content: str
    linkedTaskId: Optional[int] = None
    timestamp: datetime


class MessageCreate(BaseModel):
    sender: int
    content: str
    linkedTaskId: Optional[int] = None
    timestamp: datetime
