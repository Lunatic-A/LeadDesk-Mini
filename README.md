# LeadDesk Mini

A full-stack lead capture and management application built as part of the **Digital Heroes Full Stack Development Training Task**.

LeadDesk Mini was developed in two stages:

* **Task A — Build LeadDesk Mini**
* **Task B — Secure It and Ship It**

The final application provides a public project enquiry form, database persistence, authenticated admin access, lead management, search, status updates, and a live deployed environment.

---

# Task A — Build LeadDesk Mini

## Overview

LeadDesk Mini is a lead capture and management application.

Visitors can submit project enquiries through a public-facing form. Administrators can access a dedicated dashboard to view, search, and manage submitted leads.

The lead lifecycle is:

```text
Visitor
   ↓
Submits project enquiry
   ↓
Lead is validated
   ↓
Lead is stored in the database
   ↓
Admin views the lead
   ↓
Admin updates the status
New → Contacted → Closed
```

---

## Task A Features

### Public Landing Page

* Responsive landing page
* Project enquiry form
* Name field
* Email field
* Budget range selection
* Project message field
* Client-side form validation
* Server-side validation
* Success and error handling
* Responsive design
* Required Digital Heroes training task credit in the footer

### Lead Management

Each submitted enquiry is stored as a lead containing:

* Name
* Email
* Budget
* Project message
* Status
* Creation timestamp

The default status of every new lead is:

```text
New
```

Administrators can update the lead status through the dashboard:

```text
New → Contacted → Closed
```

### Admin Dashboard

The dashboard provides:

* Total lead count
* New lead count
* Contacted lead count
* Closed lead count
* View all leads
* Search leads by name or email
* View budget information
* View project messages
* View submission dates
* Update lead status
* Loading states
* Empty states
* Responsive layout

---

# Task B — Secure It and Ship It

Task B takes LeadDesk Mini from a basic working application and makes it suitable for a client-facing live environment.

The focus of Task B was:

* Real admin authentication
* Secure protected API access
* Deployment
* Fresh-browser testing
* Documentation
* Walkthrough of the complete application flow

---

## Task B — Authentication

The admin area uses real backend authentication instead of relying on a hardcoded frontend access check.

The authentication flow is:

```text
Admin enters username and password
              ↓
Frontend sends credentials to backend
              ↓
Backend validates credentials
              ↓
Password is verified against a stored password hash
              ↓
Backend generates a JWT access token
              ↓
Frontend stores the token
              ↓
Protected requests include the JWT token
              ↓
Backend validates the token
              ↓
Admin can access protected lead-management endpoints
```

### JWT Authentication

After successful login, the backend returns an access token.

Protected requests include:

```text
Authorization: Bearer <access_token>
```

The backend validates the token before allowing access to protected endpoints.

### Password Security

The admin password is not stored as plaintext for verification.

The backend uses password hash verification before issuing an access token.

### Protected Endpoints

The following endpoints require authentication:

```text
GET /api/leads
PATCH /api/leads/{lead_id}/status
```

The lead submission endpoint remains publicly accessible:

```text
POST /api/leads
```

---

# Data Model

The application uses a `Lead` model.

| Field      | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| id         | Integer  | Unique lead identifier                    |
| name       | String   | Name of the person submitting the enquiry |
| email      | String   | Email address                             |
| budget     | String   | Selected budget range                     |
| message    | String   | Project description                       |
| status     | String   | Current lead status                       |
| created_at | DateTime | Time the lead was created                 |

### Default Lead Status

```text
New
```

### Lead Status Lifecycle

```text
New → Contacted → Closed
```

Lead status changes are persisted in the database.

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* JWT Authentication
* Password Hash Verification

## Database

* SQLite

## Deployment

* Frontend: Vercel
* Backend: Render

---

# Project Structure

```text
LeadDesk-Mini/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── main.py
│   ├── auth.py
│   ├── admin.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── leaddesk.db
│
├── .gitignore
└── README.md
```

---

# Application Routes

## Public Website

```text
/
```

The public website allows visitors to submit project enquiries.

## Admin Dashboard

```text
/admin
```

The admin dashboard allows authenticated administrators to view, search, and update leads.

---

# API Documentation

## Root Health Check

```http
GET /
```

Returns the API status.

---

## Health Endpoint

```http
GET /api/health
```

Example response:

```json
{
  "status": "healthy"
}
```

---

## Admin Login

```http
POST /api/login
```

Example request:

```json
{
  "username": "admin",
  "password": "your-password"
}
```

Example response:

```json
{
  "access_token": "jwt-token",
  "token_type": "bearer"
}
```

The access token is used for protected API requests.

---

## Create Lead

```http
POST /api/leads
```

This endpoint is publicly accessible.

Example request:

```json
{
  "name": "Ayesha",
  "email": "ayesha@example.com",
  "budget": "₹50,000 - ₹1,00,000",
  "message": "I need a modern web application for my business."
}
```

Example response:

```json
{
  "id": 1,
  "name": "Ayesha",
  "email": "ayesha@example.com",
  "budget": "₹50,000 - ₹1,00,000",
  "message": "I need a modern web application for my business.",
  "status": "New",
  "created_at": "2026-07-25T07:08:58.231806"
}
```

---

## Get Leads

```http
GET /api/leads
```

Returns submitted leads.

This endpoint requires JWT authentication.

### Search

```http
GET /api/leads?search=ayesha
```

The search supports:

* Lead name
* Email address

Required header:

```text
Authorization: Bearer <access_token>
```

---

## Update Lead Status

```http
PATCH /api/leads/{lead_id}/status
```

This endpoint requires JWT authentication.

Supported statuses:

```text
New
Contacted
Closed
```

Example:

```http
PATCH /api/leads/1/status?status=Contacted
```

Required header:

```text
Authorization: Bearer <access_token>
```

---

# Validation

## Client-Side Validation

The frontend validates required form fields before submission.

The form validates:

* Required name
* Valid email format
* Required budget selection
* Required project message

## Server-Side Validation

The backend validates incoming requests using Pydantic.

The API validates:

* Name
* Email format
* Budget
* Message length

This ensures that invalid data cannot be stored even if frontend validation is bypassed.

---

# Deployment

The application was deployed to free-tier hosting platforms.

## Frontend

The React frontend is deployed on:

```text
Vercel
```

## Backend

The FastAPI backend is deployed on:

```text
Render
```

The deployed frontend communicates with the deployed backend through REST API requests.

---

# Fresh Browser Testing

As part of Task B, the deployed application was tested from a fresh browser session with no existing local state.

The tested flow was:

```text
Fresh browser session
        ↓
Open public website
        ↓
Submit a new project enquiry
        ↓
Open /admin
        ↓
Login with admin credentials
        ↓
View submitted lead
        ↓
Search for lead
        ↓
Change status: New → Contacted
        ↓
Change status: Contacted → Closed
```

This confirmed the complete deployed flow from public lead submission to authenticated lead management.

---

# Live Application

## Public Website

https://lead-desk-mini-lovat.vercel.app

## Admin Dashboard

https://lead-desk-mini-lovat.vercel.app/admin

## Backend API

https://leaddesk-mini-2cyf.onrender.com

## API Documentation

https://leaddesk-mini-2cyf.onrender.com/docs

---

# Test Credentials

The admin login is available for evaluation.

```text
Username: admin
Password: Provided separately for evaluation
```

The password is intentionally not published directly in this public repository.

---

# Task B Deliverables

## 1. Deployed URLs

### Public Application

https://lead-desk-mini-lovat.vercel.app

### Admin Dashboard

https://lead-desk-mini-lovat.vercel.app/admin

### Backend API

https://leaddesk-mini-2cyf.onrender.com

---

## 2. README

This README documents:

* The application architecture
* Lead data model
* Authentication approach
* JWT token flow
* Protected API endpoints
* Deployment
* Local setup
* Testing flow

---

## 3. Loom Walkthrough

The walkthrough demonstrates the complete flow:

1. Opening the public website
2. Submitting a new project enquiry
3. Opening the admin dashboard
4. Logging in with admin credentials
5. Viewing the submitted lead
6. Searching for the lead
7. Changing the status from `New` to `Contacted`
8. Changing the status from `Contacted` to `Closed`

### Loom Walkthrough

```text
Loom URL: https://drive.google.com/file/d/1JXeWPqMm0KCt1EO6fzYoi0l5gr4OQNIe/view?usp=sharing
```

---

# Security Improvements in Task B

The application was improved with:

* Real backend admin authentication
* Password hash verification
* JWT access tokens
* Protected admin API endpoints
* Token-based authorization
* Server-side request validation
* CORS configuration for the deployed frontend and local development
* No reliance on a frontend-only hardcoded access check
* Fresh-browser testing with no existing local authentication state

---

# Design Decisions

## Why SQLite?

SQLite was selected because it is:

* Simple to configure
* Lightweight
* Suitable for this small lead management application
* Easy to run locally without additional database infrastructure

## Why FastAPI?

FastAPI provides:

* Clear API structure
* Automatic API documentation
* Pydantic-based request validation
* High performance
* Simple integration with the React frontend

## Why React?

React was used to create:

* A component-based frontend
* Interactive form handling
* Dynamic admin dashboard updates
* Search functionality
* Status management without page reloads

---

# Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/Lunatic-A/LeadDesk-Mini
cd LeadDesk-Mini
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## Local Application URLs

### Public Website

```text
http://localhost:5173
```

### Admin Dashboard

```text
http://localhost:5173/admin
```

### API Documentation

```text
http://127.0.0.1:8000/docs
```

---

# AI Usage

AI tools were used during the development process for assistance with:

* Project planning
* Debugging
* Code suggestions
* Implementation guidance
* API integration troubleshooting
* Authentication implementation guidance
* User interface refinement

The final project structure, technical decisions, integration, testing, deployment, and product implementation were reviewed and completed by me.

---

# Digital Heroes Training Task Credit

This project includes the required visible credit line in the public website footer:

**Built for Digital Heroes Training Task**

The credit links to:

https://digitalheroesco.com

---

# Project Status

## Task A — Build LeadDesk Mini

* [x] Public landing page
* [x] Lead capture form
* [x] Client-side validation
* [x] Server-side validation
* [x] Database persistence
* [x] Admin dashboard
* [x] Lead search
* [x] Lead status management
* [x] Responsive interface
* [x] Loading and empty states
* [x] Required footer credit

## Task B — Secure It and Ship It

* [x] Real admin authentication
* [x] Password hash verification
* [x] JWT-based authentication
* [x] Protected admin endpoints
* [x] Frontend deployment
* [x] Backend deployment
* [x] Deployed URLs
* [x] Fresh-browser testing
* [x] README documentation
* [x] Loom walkthrough link added

---

# Author

Built by **Ayesha Zahid**

**B.Sc. Information Technology Graduate**

Interested in:

* Software Development
* Artificial Intelligence
* Machine Learning
* Full-Stack Development

---

# License

This project was created as part of the **Digital Heroes Full Stack Development Training Task**.
