from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use env var in containers, fallback for local dev
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:password@db:5432/tasks_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
