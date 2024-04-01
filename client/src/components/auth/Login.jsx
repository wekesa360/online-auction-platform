import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login,  } from "../../store/actions";
import "./Login.css";
import { Link } from "react-router-dom";
import Toast from "../common/Toast/Toast";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isRegisteredNow = useSelector((state) => state.auth.isRegisteredNow);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated= useSelector(
    (state) => state.auth.isAuthenticated
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        await dispatch(login(formData.username, formData.password));
      } catch (error) {
        if (error)
          Toast.error(error.message);
      }
    };

    useEffect(() => {
      if (error && error.message) {
        Toast.error(error.message);
      } else if (isAuthenticated) {
        Toast.success("Login successful");
        if (user.role === "admin" && isRegisteredNow) {
          navigate("/register/auctioneer");
        } else {
          navigate("/");
        }
        
      } else if (!isLoading && !isAuthenticated && error) {
        Toast.error(error);
      }
    }, [error, isAuthenticated, isLoading, navigate, user, isRegisteredNow]);


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
          {error && <p className="error-message">{error.message}</p>}
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
