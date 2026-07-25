from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    budget: str
    message: str


class LeadResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    budget: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str

class StatusUpdate(BaseModel):
    status: str