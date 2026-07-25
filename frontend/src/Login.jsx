import { useState } from "react";

const API_URL = "https://leaddesk-mini-2cyf.onrender.com";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Login failed";

        if (typeof data.detail === "string") {
          errorMessage = data.detail;
        } else if (Array.isArray(data.detail)) {
          errorMessage = data.detail
            .map((item) => item.msg || "Invalid input")
            .join(", ");
        }

        throw new Error(errorMessage);
      }

      localStorage.setItem(
        "token",
        data.access_token
      );

      onLogin();
    } catch (error) {
      setError(
        typeof error.message === "string"
          ? error.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">L</div>

        <p className="eyebrow">
          ADMIN ACCESS
        </p>

        <h1>Welcome back.</h1>

        <p className="login-description">
          Sign in to manage your incoming leads.
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign in →"}
          </button>
        </form>

        <a
          href="/"
          className="login-back-link"
        >
          ← Back to public site
        </a>
      </div>
    </div>
  );
}

export default Login;