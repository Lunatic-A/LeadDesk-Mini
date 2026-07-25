from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Lead
from schemas import LeadCreate, LeadResponse

from auth import verify_password, create_access_token
from admin import ADMIN_USERNAME, ADMIN_PASSWORD_HASH
from schemas import LoginRequest

from auth import (
    verify_password,
    create_access_token,
    get_current_admin
)

# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(title="LeadDesk Mini API")


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://lead-desk-mini-lovat.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Health check
@app.get("/")
def root():
    return {
        "message": "LeadDesk Mini API is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }


# Create a new lead
@app.post(
    "/api/leads",
    response_model=LeadResponse,
    status_code=201
)

@app.post(
    "/api/leads",
    response_model=LeadResponse,
    status_code=201
)
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db)
):
    new_lead = Lead(
        name=lead.name,
        email=lead.email,
        budget=lead.budget,
        message=lead.message
    )

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    return new_lead


# Get all leads with search
@app.get("/api/leads")
def get_leads(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    query = db.query(Lead)

    if search:
        query = query.filter(
            (Lead.name.ilike(f"%{search}%")) |
            (Lead.email.ilike(f"%{search}%"))
        )

    return query.order_by(
        Lead.created_at.desc()
    ).all()


# Update lead status
@app.patch("/api/leads/{lead_id}/status")
def update_lead_status(
    lead_id: int,
    status_update: StatusUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    if status_update.status not in ["New", "Contacted", "Closed"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    lead.status = status_update.status

    db.commit()
    db.refresh(lead)

    return lead