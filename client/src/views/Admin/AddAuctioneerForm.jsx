import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAuctioneer } from '../../store/actions';

const AuctioneerManagement = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [establishedYear, setEstablishedYear] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newAuctioneer = {
        name,
        description,
        location,
        contact,
        establishedYear,
        logoUrl,
      };

      await dispatch(createAuctioneer(newAuctioneer));
      resetForm();
    } catch (error) {
      console.error('Error creating auctioneer:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setLocation('');
    setContact('');
    setEstablishedYear('');
    setLogoUrl('');
  };

  return (
    <div>
      <h2>Auctioneer Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="establishedYear" className="form-label">Established Year</label>
          <input
            type="number"
            className="form-control"
            id="establishedYear"
            value={establishedYear}
            onChange={(e) => setEstablishedYear(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logoUrl" className="form-label">Logo URL</label>
          <input
            type="text"
            className="form-control"
            id="logoUrl"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Auctioneer</button>
      </form>
    </div>
  );
};

export default AuctioneerManagement;
