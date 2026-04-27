import os

os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from app import app, db


def setup_function():
    with app.app_context():
        db.drop_all()
        db.create_all()


def test_home():
    client = app.test_client()
    response = client.get("/")

    assert response.status_code == 200
    assert response.get_json()["message"] == "Backend API is running"


def test_add_and_get_data():
    client = app.test_client()

    create_response = client.post("/api/data", json={"title": "DevOps task"})

    assert create_response.status_code == 201
    assert create_response.get_json()["title"] == "DevOps task"

    list_response = client.get("/api/data")

    assert list_response.status_code == 200
    assert len(list_response.get_json()) == 1
    assert list_response.get_json()[0]["title"] == "DevOps task"


def test_delete_data():
    client = app.test_client()

    create_response = client.post("/api/data", json={"title": "Delete task"})
    task_id = create_response.get_json()["id"]

    delete_response = client.delete(f"/api/data/{task_id}")

    assert delete_response.status_code == 200
    assert delete_response.get_json()["message"] == "Task deleted successfully"

    list_response = client.get("/api/data")

    assert list_response.status_code == 200
    assert list_response.get_json() == []


def test_create_without_title():
    client = app.test_client()

    response = client.post("/api/data", json={})

    assert response.status_code == 400
    assert response.get_json()["error"] == "Title is required"
