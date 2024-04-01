import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, createUserProfile, updateUserProfile, deleteUserProfile } from '../../store/actions';
import Toast from '../../components/common/Toast/Toast';

const ProfileManagement = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.profile.error);
  const loading = useSelector((state) => state.profile.loading);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    dispatch(fetchUserProfile());
    if (error && error.message) {
      Toast.error(error.message);
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || '');
      setLastName(userProfile.lastName || '');
      setEmail(user.email);
      setPhone(userProfile.phoneNumber || '');
      setAddress(userProfile.address || '');
      setProfilePic(userProfile.profilePic || '');
    }
  }, [userProfile, user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleAddProfile = () => {
    const newProfile = {
      firstName,
      lastName,
      phoneNumber: phone,
      address,
      profilePic
    };
    dispatch(createUserProfile(newProfile));
    dispatch(fetchUserProfile());
    if (!error) {
      Toast.success('Profile created successfully.');
    }
    // setFirstName('');
    // setLastName('');
    // setEmail('');
    // setPhone('');
    // setAddress('');
    // setProfilePic('');
    setEditMode(true);
  };
  

  const handleSave = () => {
    const updatedProfile = {
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      address,
      profilePic,
    };
    dispatch(updateUserProfile(updatedProfile));
    setEditMode(false);
    dispatch(fetchUserProfile());
    if (!error) {
      Toast.success('Profile updated successfully.');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFirstName(userProfile?.firstName || '');
    setLastName(userProfile?.lastName || '');
    setEmail(userProfile?.email || '');
    setPhone(userProfile?.phoneNumber || '');
    setAddress(userProfile?.address || '');
    setProfilePic(userProfile?.profilePic || '');
  };

  const handleDeleteProfile = () => {
    if (!userProfile) {
      window.confirm('You do not have a profile to delete.')
      return;
    }
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      dispatch(deleteUserProfile());
      dispatch(fetchUserProfile());
      if (!error) {
        Toast.success('Profile deleted successfully.');
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setProfilePic('');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile Management</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">
            Profile Picture
          </label>
          <input
            type="text"
            className="form-control"
            id="profilePic"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
        {editMode ? (
          <>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={userProfile ? handleEdit : handleAddProfile}>
            {userProfile ? 'Edit Profile' : 'Add Profile'}
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={handleDeleteProfile}>
          Delete Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;
