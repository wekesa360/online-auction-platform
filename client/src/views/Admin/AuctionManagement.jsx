import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

import {
  deleteAuction,
  updateAuction,
  createAuction,
  fetchAuctions,
} from "../../store/actions";
import "./AuctioneerManagement.css";

const AuctionManagement = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auction.loading);
  const auctions = useSelector((state) => state.auction.auctions);
  const error = useSelector((state) => state.auction.error);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [description, setDescription] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [startingDate, setStartingDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startingPrice, setStartingPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles] = useState([]);

  
  const handleEdit = (auction) => {
    setSelectedAuction(auction);
    setTitle(auction.title);
    setDescription(auction.description);
    setStartingTime(auction.startingTime);
    setEndTime(auction.endTime);
    setStartingPrice(auction.startingPrice);
    setStatus(auction.status);
    setMinimumBid(auction.minimumBid);
    setStartingTime(auction.startingTime);
    setStartingDate(auction.startingDate);
    setEndDate(auction.endDate);
    setStartingPrice(auction.startingPrice);
    setImageUrl(auction.imageUrl);

    setShowAddForm(true);
    setEditMode(true);
    
  };

  const handleDelete = (auctionId) => {
    dispatch(deleteAuction(auctionId));
  };
   
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('startingTime', startingTime);
        formData.append('endTime', endTime);
        formData.append('status', status);
        formData.append('minimumBid', minimumBid);
        formData.append('startingDate', startingDate);
        formData.append('endDate', endDate);
        formData.append('startingPrice', startingPrice);
        formData.append('imageUrl', imageUrl);
      
        // Append the uploaded files to the formData
        files.forEach((file) => {
          formData.append('image', file);
        });
      
        try {
          if (editMode) {
            dispatch(updateAuction(selectedAuction.id, formData));
            setEditMode(false);
            // Perform any additional actions after successful update
          } else {
             dispatch(createAuction(formData));
            // Perform any additional actions after successful creation
          }
        } catch (error) {
          console.error(error);
        }

        resetForm();
      };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartingTime("");
    setEndTime("");
    setStartingPrice("");
    setStatus("");
    setTitle("");
    setMinimumBid("");
    setStartingTime("");
    setStartingDate(new Date());
    setEndDate(new Date());
    setStartingPrice("");
    setImageUrl("");
    setEditMode(false);
    setSelectedAuction(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4">
      <h2>Auction Management</h2>
      <button
        className="btn btn-primary"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Close Form" : "Add Auction"}
      </button>
      {showAddForm && (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
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
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="minimumBid" className="form-label">
                Minimum Bid
              </label>
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
              <label htmlFor="startingTime" className="form-label">
                Starting Time
              </label>
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
              <label htmlFor="startingDate" className="form-label">
                Starting Date
              </label>
              <DatePicker
                selected={startingDate}
                onChange={(date) => setStartingDate(date)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
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
              <label htmlFor="startingPrice" className="form-label">
                Starting Price
              </label>
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
              <label htmlFor="imageUrl" className="form-label">
                Image URL
              </label>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {files.length > 0 ? (
                    <div>
                    {files.map((file) => (
                        <div key={file.name}>
                        <img src={URL.createObjectURL(file)} alt={file.name} height="100" />
                        <p>{file.name}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p>Drag and drop an image here, or click to select an image</p>
                )}
                </div>
              
            </div>
          <button type="submit" className="btn btn-primary">
            {editMode ? "Update Auction" : "Add Auction"}
          </button>
        </form>
      )}
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Reserve Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan="6">Error: {error.message}</td>
            </tr>
          )}
          {auctions.map((auction) => (
            <tr key={auction._id}>
              <td>{auction.title}</td>
              <td>{auction.description}</td>
              <td>{auction.startingTime}</td>
              <td>{auction.endTime}</td>
              <td>{auction.startingPrice}</td>
              <td>{auction.status}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEdit(auction)}
                >
                  <i className="bi bi-pencil"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(auction._id)}
                >
                  <i className="bi bi-trash"></i> Delete 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionManagement;
