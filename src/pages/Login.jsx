import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login submitted:", {
      email,
      password,
    });
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration auth-decoration-one">
        ✦
      </div>

      <div className="auth-decoration auth-decoration-two">
        ♡
      </div>

      <section className="login-card">
        <div className="login-header">
          <span className="login-kicker">WELCOME BACK ✦</span>

          <h1>
            Let's find
            <br />
            <span>your stuff.</span>
          </h1>

          <p>
            Sign in to your Findora account and
            get back to finding what matters.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log in ✦
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>

          <Link to="/register">
            Create one →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;