from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas
from .database import SessionLocal, engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DevOps Task Manager API")

# CORS – allow everything for simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in prod: restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/tasks", response_model=list[schemas.Task])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(title=task.title, description=task.description)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"detail": "Task deleted"}
