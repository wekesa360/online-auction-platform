import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isAdminFirstLogin } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData.username, formData.password));
      if (isAuthenticated) {
        if (isAdminFirstLogin) {
          navigate("/register/auctioneer");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.message === "INCORRECT_PASSWORD") {
        setError("Incorrect password or email. Please try again");
      } else if (error.message === "INTERNAL_ERROR") {
        setError("Something went wrong. Try again later");
      } else if (error.message === "NETWORK_ERROR") {
        setError("Something wrong with your connection");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container ">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="link-text">
            Sign up Here!
          </Link>
        </p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="username"
              placeholder="Email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
          {/* <p className="text-center mt-3">Forgot Password? <Link to="/register" className="link-text">Click Here!</Link></p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
