# FastAPI Backend for Mintro

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router as api_router
from database import engine
from models import Base

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to Mintro Backend"}

app.include_router(api_router, prefix="/api")