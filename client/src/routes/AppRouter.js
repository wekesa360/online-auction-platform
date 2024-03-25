import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer'
import LandingPage from '../views/Home/LandingPage';
import AuctionListing from '../components/auctions/AuctionListing/AuctionListing';
import UserAccountPage from '../views/UserAccount.jsx/UserAccountPage';
import AdminPage from '../views/Admin/AdminPage';
import AuctioneerForm from '../components/auth/Auctioneer';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

const AppRouter = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={ <LandingPage /> } />
                <Route path="/register" element={ < Register />} />
                <Route path="/login" element={ < Login />} />
                <Route path="/auction-listing" element = { <AuctionListing/> } />
                <Route path="/user-account" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<UserAccountPage />} />} />
                <Route path="/register/auctioneer" element= {<AuctioneerForm/>} />
                <Route path="/admin" element={<PrivateRoute isAuthenticated={isAuthenticated && user.role === 'admin'} element={<AdminPage />} />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default AppRouter;
