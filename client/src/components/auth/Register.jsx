import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/actions";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../common/Toast/Toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const { isRegisteredNow, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setPasswordMatch(e.target.value === formData.password);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(passwordRegex.test(password));
    setPasswordMatch(formData.password === formData.confirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordMatch && passwordValid) {
      try {
        // remove confirmPassword from formData using setFormDara
        const { confirmPassword, ...rest } = formData;
        await dispatch(register(rest));
      } catch (error) {
        // Handle error
      }
    } else {
      Toast.error(
        "Passwords do not match or do not meet the requirements. Please try again."
      );
    }
  };

  useEffect(() => {
    if (isRegisteredNow) {
      Toast.success("Registration successful");
      if (formData.role === "admin") {
        navigate("/login");
      } else {
        navigate("/login");
      }
    } else if (error && error.message) {
      Toast.error(error.message);
    }
  }, [isRegisteredNow, error, formData.role, navigate]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/login" className="link-text">
            Sign up Here!
          </Link>
        </p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {!passwordMatch && (
              <p className="error-message">Passwords do not match</p>
            )}
            {!passwordValid && (
              <p className="error-message">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
              </p>
            )}
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="error-message">{error.message}</p>}
          <button
            type="submit"
            className="btn btn-primary register-btn"
            disabled={!passwordMatch || !passwordValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
