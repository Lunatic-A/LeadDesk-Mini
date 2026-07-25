# LeadDesk Mini

A full-stack lead capture and management application built for the **Digital Heroes Full Stack Development Training Task**.

LeadDesk Mini provides a public-facing project enquiry form and an admin dashboard for managing submitted leads through their lifecycle.

---

## Overview

LeadDesk Mini is designed around a simple workflow:

```text
Visitor
   ↓
Submits project enquiry
   ↓
Lead is validated
   ↓
Lead is stored in SQLite
   ↓
Admin views and searches leads
   ↓
Lead status is updated
(New → Contacted → Closed)
```

The project demonstrates the complete flow between a React frontend, FastAPI backend, database persistence, validation, and an admin management interface.

---

## Features

### Public Landing Page

* Modern, responsive landing page
* Project enquiry form
* Name field
* Email field
* Budget range selection
* Project message field
* Client-side form validation
* Server-side validation
* Success and error handling
* Responsive design for different screen sizes
* Required Digital Heroes training task credit in the footer

### Admin Dashboard

* Dedicated `/admin` dashboard
* Overview statistics:

  * Total Leads
  * New Leads
  * Contacted Leads
  * Closed Leads
* View all submitted leads
* Search leads by name or email
* View budget information
* View project messages
* View submission dates
* Update lead status:

  * New
  * Contacted
  * Closed
* Status updates are persisted in the database
* Responsive dashboard layout
* Empty and loading states

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic

### Database

* SQLite

---

## Project Structure

```text
LeadDesk-Mini/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
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

## Application Routes

### Public Website

```text
/
```

The public landing page allows visitors to submit project enquiries.

### Admin Dashboard

```text
/admin
```

The admin dashboard allows leads to be viewed, searched, and updated.

---

## API Endpoints

### Health Check

```http
GET /
```

Returns the API status.

---

### Health Endpoint

```http
GET /api/health
```

Returns:

```json
{
  "status": "healthy"
}
```

---

### Create Lead

```http
POST /api/leads
```

Creates and stores a new lead.

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

### Get Leads

```http
GET /api/leads
```

Returns all submitted leads.

Search by name or email:

```http
GET /api/leads?search=ayesha
```

---

### Update Lead Status

```http
PATCH /api/leads/{lead_id}/status
```

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

---

## Validation

### Client-Side Validation

The frontend validates required form fields before submission.

The form validates:

* Required name
* Valid email format
* Required budget selection
* Required project message

### Server-Side Validation

The backend validates incoming requests using Pydantic.

The API validates:

* Name length
* Email format
* Budget value
* Message length

This ensures that invalid data cannot be stored even if frontend validation is bypassed.

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Lunatic-A/LeadDesk-Mini
cd LeadDesk-Mini
```

---

## Backend Setup

Open a terminal in the project root:

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

FastAPI interactive documentation:

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

### Public Landing Page

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

## Database

LeadDesk Mini uses SQLite with SQLAlchemy.

The database stores:

* Lead ID
* Name
* Email
* Budget
* Project message
* Lead status
* Creation timestamp

The default status for every new lead is:

```text
New
```

Lead statuses can then be updated through the admin dashboard:

```text
New → Contacted → Closed
```

---

## Design Decisions

### Why SQLite?

SQLite was selected because it is:

* Simple to configure
* Lightweight
* Suitable for this small lead management application
* Easy to run locally without additional database infrastructure

### Why FastAPI?

FastAPI provides:

* Clear API structure
* Automatic API documentation
* Pydantic-based request validation
* High performance
* Simple integration with the React frontend

### Why React?

React was used to create:

* A reusable component-based frontend
* Interactive form handling
* Dynamic admin dashboard updates
* Search and status management without page reloads

---

## AI Usage

AI tools were used during the development process for assistance with project planning, debugging, code suggestions, implementation guidance, and refining parts of the user interface.

The final project structure, technical decisions, integration, testing, and product implementation were reviewed and completed by me.

---

## Digital Heroes Training Task Credit

This project includes the required training task credit in the public website footer:

**Built for Digital Heroes Training Task**

The credit links to:

```text
https://digitalheroesco.com
```

---

## Project Status

### Task A — LeadDesk Mini

* [x] Public landing page
* [x] Lead capture form
* [x] Client-side validation
* [x] Server-side validation
* [x] Database persistence
* [x] Admin dashboard
* [x] Lead search
* [x] Lead status management
* [x] Responsive interface
* [x] Required footer credit

---

## Author

Built by **Ayesha Zahid**

B.Sc. Information Technology Graduate

Interested in:

* Software Development
* Artificial Intelligence
* Machine Learning
* Full-Stack Development

---

## License

This project was created as part of the Digital Heroes Full Stack Development Training Task.
