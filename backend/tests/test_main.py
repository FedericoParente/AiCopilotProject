import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from fastapi.testclient import TestClient
from app.main import app, users

client = TestClient(app)

def setup_function(function):
    users.clear()
    # reset user counter in the application module
    import app.main as main_mod
    main_mod.user_counter = 1


def test_create_and_get_user():
    payload = {"email": "test@example.com", "name": "Test User", "role": "admin"}
    response = client.post("/resources/users", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["email"] == payload["email"]
    # verify retrieval
    response = client.get(f"/resources/users/{data['id']}")
    assert response.status_code == 200
    get_data = response.json()
    assert get_data == data


def test_context_counts():
    # ensure clean state
    users.clear()
    import app.main as main_mod
    main_mod.user_counter = 1

    payload = {"email": "foo@example.com", "name": "Foo", "role": "user"}
    client.post("/resources/users", json=payload)
    response = client.get("/context")
    assert response.status_code == 200
    context = response.json()
    assert context["users"] == 1
