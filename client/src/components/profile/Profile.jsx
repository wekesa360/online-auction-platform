import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile, deleteUserAccount } from '../../store/actions';
import Toast from '../../components/common/Toast/Toast';

const ProfileManagement = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const error = useSelector((state) => state.user.error);
  
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
  
    useEffect(() => {
      dispatch(fetchUserProfile());
      if (userProfile) {
        setName(userProfile.name);
        setEmail(userProfile.email);
        setPhone(userProfile.phone);
        setAddress(userProfile.address);
      }
    }, [dispatch, userProfile]);
  
    // ... (add event handlers and other functions here)
  };

  const handleEdit = () => {
    setEditMode(true);
  };
  
  const handleSave = () => {
    const updatedProfile = {
      name,
      email,
      phone,
      address,
    };
    dispatch(updateUserProfile(updatedProfile));
    setEditMode(false);
    Toast.success('Profile updated successfully.');
  };
  
  const handleCancel = () => {
    setEditMode(false);
    setName(userProfile.name);
    setEmail(userProfile.email);
    setPhone(userProfile.phone);
    setAddress(userProfile.address);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      dispatch(deleteUserAccount());
      Toast.success('Account deleted successfully.');
      // Optionally, redirect the user to the login page or perform any other necessary actions
    }
  };


  return (
    <div>
      <h2>Profile Management</h2>
      {editMode ? (
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Add similar input fields for email, phone, and address */}
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Name: {userProfile.name}</p>
          {/* Display other profile fields here */}
          <button type="button" className="btn btn-primary" onClick={handleEdit}>
            Edit Profile
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );