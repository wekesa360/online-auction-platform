import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddAuctionForm = ({ onAuctionAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minimumBid, setMinimumBid] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [startingDate, setStartingDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [auctioneer, setAuctioneer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newAuction = {
        title,
        description,
        minimumBid,
        startingTime,
        startingDate,
        endDate,
        endTime,
        startingPrice,
        imageUrl,
        auctioneer,
      };

      await axios.post('/auction', newAuction);
      onAuctionAdded();
      resetForm();
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setMinimumBid('');
    setStartingTime('');
    setStartingDate(null);
    setEndDate(null);
    setEndTime('');
    setStartingPrice('');
    setImageUrl('');
    setAuctioneer('');
  };

  return (
    <div>
      <h2>Add Auction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <label htmlFor="minimumBid" className="form-label">Minimum Bid</label>
          <input
            type="number"
            className="form-control"
            id="minimumBid"
            value={minimumBid}
            onChange={(e) => setMinimumBid(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startingTime" className="form-label">Starting Time</label>
          <input
            type="time"
            className="form-control"
            id="startingTime"
            value={startingTime}
            onChange={(e) => setStartingTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startingDate" className="form-label">Starting Date</label>
          <DatePicker
            selected={startingDate}
            onChange={(date) => setStartingDate(date)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startingPrice" className="form-label">Starting Price</label>
          <input
            type="number"
            className="form-control"
            id="startingPrice"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="auctioneer" className="form-label">Auctioneer</label>
          <input
            type="text"
            className="form-control"
            id="auctioneer"
            value={auctioneer}
            onChange={(e) => setAuctioneer(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Auction</button>
      </form>
    </div>
  );
};

export default AddAuctionForm;