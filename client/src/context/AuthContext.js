import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${authToken}` } });
                console.log('Auth user', data);
                setAuthUser(data);
            } catch (error) {
                console.log('Failed to fetch auth user', error.message);
            }
        };

        fetchAuthUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };