from fastapi import APIRouter, Depends
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func
from models import Transactions, engine
from .auth import get_current_user

router = APIRouter()
Session = sessionmaker(bind=engine)


@router.get("/transactions")
def get_transactions(user_id: int = Depends(get_current_user)):
    session = Session()
    results = session.query(Transactions).filter(Transactions.user_id == user_id).all()
    session.close()
    return results


@router.get("/expenses")
def get_expenses(user_id: int = Depends(get_current_user)):
    session = Session()
    results = (
        session.query(Transactions)
        .filter(Transactions.user_id == user_id, Transactions.type == "Expense")
        .all()
    )
    session.close()
    return results


@router.get("/incomes")
def get_income(user_id: int = Depends(get_current_user)):
    session = Session()
    results = (
        session.query(Transactions)
        .filter(Transactions.user_id == user_id, Transactions.type == "Income")
        .all()
    )
    session.close()
    return results


@router.get("/total_expenses")
def get_total_expenses(user_id: int = Depends(get_current_user)):
    session = Session()
    results = (
        session.query(func.sum(Transactions.amount))
        .filter(Transactions.user_id == user_id, Transactions.type == "Expense")
        .scalar()
        or 0
    )
    session.close()
    return results


@router.get("/total_income")
def get_total_income(user_id: int =Depends(get_current_user)):
    session = Session()
    results = (
        session.query(func.sum(Transactions.amount))
        .filter(Transactions.user_id == user_id, Transactions.type == "Income")
        .scalar()
        or 0
    )
    session.close()
    return results
