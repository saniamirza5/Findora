import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();


    setError("");
    setLoading(true);


    try {
      await login(email, password);


      navigate("/");
    } catch (err) {
      console.error(err);


      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">


        <h1>Welcome back ✦</h1>


        <p>Login to your Findora account</p>


        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>


          <label htmlFor="login-email">
            Email
          </label>


          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <label htmlFor="login-password">
            Password
          </label>


          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>


        </form>


        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>


      </div>
    </div>
  );
}


export default Login;