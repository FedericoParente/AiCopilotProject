# Backend Prototype

This FastAPI prototype exposes minimal MCP-compatible endpoints.

## Endpoints

- `/context`: Summary of resource counts.
- `/resources/users`
- `/resources/projects`
- `/resources/tasks`
- `/resources/messages`
- `/events`: Placeholder for event ingestion.

Run locally with:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
