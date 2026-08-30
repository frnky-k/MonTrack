import hashlib
import hmac
import os 
import time
import jwt
import uuid


from fastapi import APIRouter, HTTPException, Request, Response, status, Depends
from pydantic import BaseModel
from sqlalchemy.orm import session, sessionmaker
from jwt.exceptions import InvalidTokenError
from models import Base, User, engine, TokenPending
from datetime import datetime, timedelta, timezone


router = APIRouter()


Session = sessionmaker(bind=engine)

BOT_TOKEN = os.environ["BOT_TOKEN"]
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class Token(BaseModel):
    access_token: str
    token_type: str



def create_access_token(data: dict, expire_date: timedelta | None = None):
    to_encode = data.copy()
    if expire_date:
        expire = datetime.now(timezone.utc) + expire_date
    else: 
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt  

@router.post('/auth/init')
def init_user():
    session = Session()
    link_token = str(uuid.uuid4())
    session.add(TokenPending(token=link_token, chat_id=None))
    session.commit()
    return {"link_token": link_token}



def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized user",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = payload.get("user_id")
        if user is None:
            raise credential_exception
        return user
    except InvalidTokenError:
        raise credential_exception

def get_or_create_user_by_chat_id(chat_id: int):
    with Session() as session:
        user = session.query(User).filter(User.user_id == chat_id).first()
        if not user:
            user = User(user_id=chat_id, username="", first_name="", photo_url="")
            session.add(user)
            session.commit()
            session.refresh(user)
        session.close()
        return user

@router.get("/auth/status")
def check_status(link_token: str, response: Response):
    with Session() as session:
        pending = session.query(TokenPending).filter_by(token=link_token).first()
        if pending and pending.chat_id:
            user = get_or_create_user_by_chat_id(pending.chat_id)
            jwt_token = create_access_token(data={"user_id":pending.chat_id}, expire_date=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
            response.set_cookie(
                "access_token", jwt_token, 
                httponly=True, samesite="none", secure=True,
            )
            return {"linked": True}
        return {"linked":False}

@router.get("/auth/me")
def get_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        raise HTTPException(status_code=401)
    return {"user_id": payload["user_id"]}

@router.post("/auth/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"ok": True}