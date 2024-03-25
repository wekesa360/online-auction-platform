import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions'; // Import the register action
import './Register.css';
import { useNavigate, Link} from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const [error, setError] = useState(null);
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(formData));
            if (formData.role === 'admin') {
                navigate('/register/auctioneer');
            } else {
            navigate('/login');
            }
        } catch (error) {
            if (error.message === 'internal_error') {
                setError('Internal server error. Please try again later.');
                console.error('Internal server error', error.message);
                return;
            }
            if (error.message === 'INCORRECT_USERNAME') {
                setError('Username or email is already taken');
                console.error('Username or email is already taken', error.message);
                return;
            }
            setError('Failed to register. Please try again.');
            console.error('Failed to register', error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Register</h1>
                <p className="text-center">Don't have an account? <Link to="/login" className="link-text">Sign up Here!</Link></p>
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
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-primary register-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;