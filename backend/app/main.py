
from typing import Union
# from functools import lru_cache
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

import app.routes.account_routes as account_routes

from fastapi.middleware.cors import CORSMiddleware

from .database import connect_db

# CORS settings: allow frontend origin (adjust the origin if different)
origins = [
    "http://localhost:6000",  # For local dev with React on localhost:6000
    # Add other origins if necessary
]

# Add CORSMiddleware to allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


try:
    connect_db()
    print("DB CONNECTED")
except Exception as e:
    print("CANNOT CONNECT TO DB:", e)


# Env vars
from . import config


app.include_router(account_routes.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}