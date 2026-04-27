# Full-Stack CI/CD Application

## Student
Name: Bektur Asilov  
Student ID: YOUR_STUDENT_ID

## Project Description
This is a full-stack three-tier web application with:

- Frontend: React + Vite
- Backend: Flask API
- Database: PostgreSQL
- CI: GitHub Actions
- CD: Railway

## API Endpoints

### GET /
Checks if backend is running.

### GET /api/data
Returns all tasks from the database.

### POST /api/data
Adds a new task.

Example body:

```json
{
  "title": "New task"
}
```

### DELETE /api/data/:id
Deletes task by ID.

## Local Backend Run

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Local Frontend Run

```bash
cd frontend
npm install
npm run dev
```

## Run Tests

```bash
cd backend
python -m pytest
```

## Railway Deployment

Create three services:

1. PostgreSQL database
2. Backend service with root directory `/backend`
3. Frontend service with root directory `/frontend`

Backend variables:

```env
DATABASE_URL=PostgreSQL reference variable
PORT=5000
```

Frontend variables:

```env
VITE_API_URL=https://your-backend-url.up.railway.app
```
