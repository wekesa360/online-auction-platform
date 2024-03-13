import React, { useState, useContext, } from 'react';
import {AuthContext} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        role: '',
        
    });

    const { setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await register(formData);

            setAuthUser(data.user);

            navigate.push('/login');
        } catch (error) {
            console.error('Failed to register', error.message);
            // Handle error
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );

}

export default Register;