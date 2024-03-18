import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuctioneerManagement = () => {
  const [auctioneers, setAuctioneers] = useState([]);
  const [newAuctioneer, setNewAuctioneer] = useState('');

  useEffect(() => {
    fetchAuctioneers();
  }, []);

  const fetchAuctioneers = async () => {
    try {
      const response = await axios.get('/auctioneers');
      setAuctioneers(response.data);
    } catch (error) {
      console.error('Error fetching auctioneers:', error);
    }
  };

  const handleAddAuctioneer = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/auctioneers', { name: newAuctioneer });
      setNewAuctioneer('');
      fetchAuctioneers();
    } catch (error) {
      console.error('Error adding auctioneer:', error);
    }
  };

  const handleDeleteAuctioneer = async (auctioneer) => {
    try {
      await axios.delete(`/auctioneers/${auctioneer.id}`);
      fetchAuctioneers();
    } catch (error) {
      console.error('Error deleting auctioneer:', error);
    }
  };

  return (
    <div>
      <h2>Auctioneer Management</h2>
      <div className="mb-3">
        <form onSubmit={handleAddAuctioneer}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add new auctioneer"
              value={newAuctioneer}
              onChange={(e) => setNewAuctioneer(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
      <ul className="list-group">
        {auctioneers.map((auctioneer) => (
          <li key={auctioneer.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{auctioneer.name}</span>
            <button className="btn btn-danger" onClick={() => handleDeleteAuctioneer(auctioneer)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctioneerManagement;