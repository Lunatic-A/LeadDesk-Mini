from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(255), nullable=False, index=True)

    budget = Column(String(100), nullable=False)

    message = Column(Text, nullable=False)

    status = Column(
        String(20),
        nullable=False,
        default="New"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )