from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    budget: str
    message: str

    email: EmailStr

    budget: str = Field(
        ...,
        min_length=1
    )

    message: str = Field(
        ...,
        min_length=10,
        max_length=2000
    )


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