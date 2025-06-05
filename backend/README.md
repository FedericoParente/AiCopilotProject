# Backend Prototype

This FastAPI prototype exposes MCP-compatible endpoints using in-memory storage.

## Endpoints

- `/context`: Summary of resource counts.
- `/resources/users` (GET, POST)
- `/resources/users/{id}` (GET)
- `/resources/projects` (GET, POST)
- `/resources/projects/{id}` (GET)
- `/resources/tasks` (GET, POST)
- `/resources/tasks/{id}` (GET)
- `/resources/messages` (GET, POST)
- `/resources/messages/{id}` (GET)
- `/events`: Placeholder for event ingestion.

Run locally with:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
