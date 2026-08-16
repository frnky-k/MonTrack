from datetime import datetime
import os

from dotenv import load_dotenv
from sqlalchemy import Column, DateTime, Float, Integer, String, create_engine
from sqlalchemy.orm import declarative_base

load_dotenv()
DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    raise ValueError("DATABASE NOT FOUND")
Base = declarative_base()


class Transactions(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    type = Column(String, default="Expense", nullable=False)
    item = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, default="Uncategorized", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # def __repr__(self):
    # return f"Total: \n {self.item}, {self.amount}"


engine = create_engine(DB_URL)
# Base.metadata.create_all(engine)
