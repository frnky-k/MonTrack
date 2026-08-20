import hashlib
import hmac
import os 
import time
import jwt


from fastapi import APIRouter, HTTPException, Request, Response, status, Depends
from pydantic import BaseModel
from sqlalchemy.orm import session, sessionmaker
from jwt.exceptions import InvalidTokenError
from models import Base, User, engine
from datetime import datetime, timedelta, timezone


router = APIRouter()


Session = sessionmaker(bind=engine)

BOT_TOKEN = os.environ["BOT_TOKEN"]
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class TelegramAuth(BaseModel):
    id: int
    username: str | None = None
    first_name: str
    photo_url: str | None = None
    auth_date: int
    hash: str

class Token(BaseModel):
    access_token: str
    token_type: str

def verify_telegram_hash(data: TelegramAuth):
    data_dict = data.model_dump(exclude={"hash"}, exclude_none=True)
    check_string = "\n".join(f"{k}={v}" for k, v in sorted(data_dict.items()))
    secret_key = hashlib.sha256(BOT_TOKEN.encode()).digest()
    computed_hash = hmac.new(
        secret_key, check_string.encode(), hashlib.sha256
    ).hexdigest()
    return computed_hash == data.hash


def create_access_token(data: dict, expire_date: timedelta | None = None):
    to_encode = data.copy()
    if expire_date:
        expire = datetime.now(timezone.utc) + expire_date
    else: 
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt  

def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized user",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = payload.get("id")
        if user is None:
            raise credential_exception
        return user
    except InvalidTokenError:
        raise credential_exception

    

@router.post("/auth/telegram")
def telegram_login(data: TelegramAuth, response: Response):
    if not verify_telegram_hash(data):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if time.time() - data.auth_date > 86400:
        raise HTTPException(status_code=401, detail="Unauthorized")

    def get_or_create_user(telegram_data):
        session = Session()

        check_login = (
            session.query(User).filter(User.user_id == telegram_data.id).first()
        )
        if not check_login:
            new_user = User(
                user_id=telegram_data.id,
                username=telegram_data.username,
                first_name=telegram_data.first_name,
                photo_url=telegram_data.photo_url,
                auth_date=telegram_data.auth_date,
            )

            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            session.close()
            return new_user
        else:
            session.close()
            return check_login

    user = get_or_create_user(data)

    if user:
        access_token = create_access_token(data={"id":user.user_id}, expire_date=ACCESS_TOKEN_EXPIRE_MINUTES)
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True, 
            samesite="none",
            secure=True
        )
        return {"username":data.username, "id":data.id}

@router.get("/auth/me")
def get_user(current_user: int = Depends(get_current_user)):
    return current_user

    

