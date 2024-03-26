import React, { useState } from "react";
import axios from "axios";

const ProfileSection = ({ userProfile, onProfileUpdate }) => {
  const [name, setName] = useState(userProfile ? userProfile.name : "");
  const [email, setEmail] = useState(userProfile ? userProfile.email : "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = {
        name,
        email,
      };

      await axios.put("/profile", updatedProfile);
      onProfileUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
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
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSection;
