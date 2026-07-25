import { useEffect, useState } from "react";

function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeads = async (searchTerm = "") => {
    try {
      setLoading(true);

      const response = await fetch(
  `https://leaddesk-mini-2cyf.onrender.com/api/leads?search=${encodeURIComponent(
    searchTerm
  )}`
);

      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (leadId, newStatus) => {
    try {
      const response = await fetch(
  `https://leaddesk-mini-2cyf.onrender.com/api/leads/${leadId}/status?status=${newStatus}`,
  {
    method: "PATCH",
  }
);

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      fetchLeads(search);
    } catch (error) {
      alert(error.message);
    }
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;
  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-logo">L</div>
          <div>
            <h2>LeadDesk</h2>
            <span>Lead Management</span>
          </div>
        </div>

        <a href="/" className="back-link">
          View Public Site ↗
        </a>
      </header>

      <main className="admin-main">
        <div className="admin-heading">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Good morning, Admin.</h1>
            <p>Manage and track your incoming project leads.</p>
          </div>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">TOTAL LEADS</span>
            <strong>{totalLeads}</strong>
            <p>All submitted enquiries</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">NEW</span>
            <strong>{newLeads}</strong>
            <p>Awaiting first contact</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">CONTACTED</span>
            <strong>{contactedLeads}</strong>
            <p>Currently in progress</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">CLOSED</span>
            <strong>{closedLeads}</strong>
            <p>Successfully completed</p>
          </div>
        </section>

        <section className="leads-section">
          <div className="section-header">
            <div>
              <h2>All Leads</h2>
              <p>Review and manage your project enquiries.</p>
            </div>

            <div className="search-wrapper">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search name or email..."
                value={search}
                onChange={(event) => {
                  const value = event.target.value;
                  setSearch(value);
                  fetchLeads(value);
                }}
              />
            </div>
          </div>

          {loading ? (
            <div className="empty-state">
              <h3>Loading leads...</h3>
            </div>
          ) : leads.length === 0 ? (
            <div className="empty-state">
              <h3>No leads found</h3>
              <p>Try a different search or submit a new lead.</p>
            </div>
          ) : (
            <div className="lead-cards">
              {leads.map((lead) => (
                <article className="lead-card" key={lead.id}>
                  <div className="lead-card-main">
                    <div className="lead-avatar">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="lead-info">
                      <h3>{lead.name}</h3>
                      <p>{lead.email}</p>
                    </div>
                  </div>

                  <div className="lead-detail">
                    <span>Budget</span>
                    <strong>{lead.budget}</strong>
                  </div>

                  <div className="lead-detail message-detail">
                    <span>Message</span>
                    <p>{lead.message}</p>
                  </div>

                  <div className="lead-detail">
                    <span>Submitted</span>
                    <strong>
                      {new Date(
                        lead.created_at
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>

                  <div className="status-control">
                    <span>Status</span>

                    <select
                      className={`status-select status-${lead.status.toLowerCase()}`}
                      value={lead.status}
                      onChange={(event) =>
                        updateStatus(
                          lead.id,
                          event.target.value
                        )
                      }
                    >
                      <option value="New">New</option>
                      <option value="Contacted">
                        Contacted
                      </option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="admin-footer">
        <span>LeadDesk Mini</span>
        <span>Admin Dashboard</span>
      </footer>
    </div>
  );
}

function App() {
   if (window.location.pathname === "/admin") {
    return <AdminDashboard />;
   }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("https://leaddesk-mini-2cyf.onrender.com/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Something went wrong");
    }

    alert("Thank you! Your project details have been submitted.");

    setFormData({
      name: "",
      email: "",
      budget: "",
      message: "",
    });
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">LeadDesk</div>
        <a href="#lead-form" className="nav-button">
          Start a Project
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">DIGITAL PROJECT INTAKE</p>

            <h1>
              Your idea deserves
              <span> a clear next step.</span>
            </h1>

            <p className="hero-description">
              Tell us what you are building, what you need, and where you want
              to go. We will take it from there.
            </p>

            <a href="#lead-form" className="primary-button">
              Tell us about your project →
            </a>
          </div>

          <div className="hero-card">
            <div className="card-label">LEAD DESK MINI</div>
            <h2>From first message to meaningful progress.</h2>

            <div className="process">
              <div>
                <strong>01</strong>
                <span>Share your idea</span>
              </div>

              <div>
                <strong>02</strong>
                <span>We understand the need</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Build what matters</span>
              </div>
            </div>
          </div>
        </section>

        <section id="lead-form" className="form-section">
          <div className="form-intro">
            <p className="eyebrow">LET'S TALK</p>
            <h2>Tell us about your project.</h2>
            <p>
              A few details are enough to get the conversation started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="lead-form">
            <div className="form-group">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget range</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              >
                <option value="">Select a budget range</option>
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">
                  ₹50,000 - ₹1,00,000
                </option>
                <option value="₹1,00,000 - ₹3,00,000">
                  ₹1,00,000 - ₹3,00,000
                </option>
                <option value="₹3,00,000+">₹3,00,000+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="What are you looking to build?"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Submit your project →
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 LeadDesk Mini</p>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          Built for Digital Heroes Training Task
        </a>
      </footer>
    </div>
  );
}

export default App;