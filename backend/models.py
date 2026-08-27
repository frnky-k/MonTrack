from datetime import datetime
import os

from dotenv import load_dotenv
from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    create_engine,
    func
)

from sqlalchemy.orm import declarative_base, relationship

load_dotenv()
DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    raise ValueError("DATABASE NOT FOUND")
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    user_id = Column(BigInteger, unique=True, nullable=False)
    username = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    photo_url = Column(String, nullable=False)
    auth_date = Column(DateTime, default=datetime.utcnow)

    transactions = relationship("Transactions", back_populates="user")

class TokenPending(Base):
    __tablename__ = 'tokenpend'
    id = Column(Integer, primary_key=True, nullable=False)
    token = Column(String, unique=True, nullable=False, index=True)
    chat_id = Column(BigInteger, nullable=True)
    created_at = Column(DateTime, default=func.now())
    confirmed_at = Column(DateTime, nullable=True)


class Transactions(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    user_id = Column(BigInteger, ForeignKey("users.user_id"), nullable=False)
    type = Column(String, default="Expense", nullable=False)
    item = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, default="Uncategorized", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="transactions")


engine = create_engine(DB_URL)
