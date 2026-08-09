import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Registration submitted:", {
      name,
      email,
      phone,
      password,
    });
  };

  return (
    <main className="register-page">
      <div className="register-decoration decoration-one">
        ✦
      </div>

      <div className="register-decoration decoration-two">
        ♡
      </div>

      <section className="register-card">
        <div className="register-header">
          <span className="register-kicker">
            JOIN FINDORA ✦
          </span>

          <h1>
            Make lost
            <br />
            <span>less lost.</span>
          </h1>

          <p>
            Create your account and become part of
            your campus lost & found community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>

            <input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">
            Create Account ✦
          </button>
        </form>

        <div className="register-footer">
          <span>Already have an account?</span>

          <Link to="/login">
            Log in →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Register;