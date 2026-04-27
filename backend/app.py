import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

database_url = os.environ.get("DATABASE_URL", "sqlite:///local.db")

if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)


with app.app_context():
    db.create_all()


@app.get("/")
def home():
    return jsonify({
        "message": "Backend API is running",
        "student": "Bektur Asilov",
        "student_id": "YOUR_STUDENT_ID"
    })


@app.get("/api/data")
def get_data():
    tasks = Task.query.order_by(Task.id.desc()).all()
    return jsonify([
        {"id": task.id, "title": task.title}
        for task in tasks
    ])


@app.post("/api/data")
def add_data():
    data = request.get_json()

    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    task = Task(title=data["title"])
    db.session.add(task)
    db.session.commit()

    return jsonify({"id": task.id, "title": task.title}), 201


@app.delete("/api/data/<int:task_id>")
def delete_data(task_id):
    task = Task.query.get(task_id)

    if task is None:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
