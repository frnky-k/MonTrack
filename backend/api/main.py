from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import transactions

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://montrack-v1.vercel.app/"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(transactions.router)
