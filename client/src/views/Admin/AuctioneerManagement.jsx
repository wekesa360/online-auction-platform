import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AuctioneerManagement.css";
import {
  deleteAuctioneer,
  updateAuctioneer,
  createAuctioneer,
  fetchAuctioneers,
} from "../../store/actions";

const AuctioneerManagement = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auctioneer.loading);
  const auctioneers = useSelector((state) => state.auctioneer.auctioneers);
  const error = useSelector((state) => state.auctioneer.error);

  useEffect(() => {
    dispatch(fetchAuctioneers());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [selectedAuctioneer, setSelectedAuctioneer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handleEdit = (auctioneer) => {
    setSelectedAuctioneer(auctioneer);
    setName(auctioneer.name);
    setDescription(auctioneer.description);
    setLocation(auctioneer.location);
    setContact(auctioneer.contact);
    setEstablishedYear(auctioneer.establishedYear);
    setLogoUrl(auctioneer.logoUrl);
    setShowAddForm(true);
    setEditMode(true);
  };

  const handleDelete = (auctioneerId) => {
    dispatch(deleteAuctioneer(auctioneerId));
  };

  // const handleEdit = (auctioneerId, newData) => {
  //   dispatch(updateAuctioneer(auctioneerId, newData));
  //   // You may need to update the auctioneers state after editing
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAuctioneer = {
      name,
      description,
      location,
      contact,
      establishedYear,
      logoUrl,
    };

    if (editMode) {
      await dispatch(updateAuctioneer(selectedAuctioneer.id, newAuctioneer));
      setEditMode(false);
    } else {
      await dispatch(createAuctioneer(newAuctioneer));
    }

    // You may need to update the auctioneers state after adding
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setContact("");
    setEstablishedYear("");
    setLogoUrl("");
  };

  // Show loading indicator if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4">
      <h2>Auctioneer Management</h2>
      <button
        className="btn btn-primary"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Close Form" : "Add Auctioneer"}
      </button>
      {showAddForm && (
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="location" className="form-label">
              Location
            </label>
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
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
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
            <label htmlFor="establishedYear" className="form-label">
              Established Year
            </label>
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
            <label htmlFor="logoUrl" className="form-label">
              Logo URL
            </label>
            <input
              type="text"
              className="form-control"
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editMode ? "Update Auctioneer" : "Add Auctioneer"}
          </button>
        </form>
      )}
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {auctioneers ? (
            auctioneers.map((auctioneer) => (
              <tr key={auctioneer.id}>
                <td>{auctioneer.name}</td>
                <td>{auctioneer.contact}</td>
                <td>{auctioneer.location}</td>
                <td>
                  {/* <button className="btn btn-primary btn-sm"><i className="bi bi-eye"></i> View</button> */}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleEdit(auctioneer)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(auctioneer.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No auctioneers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctioneerManagement;
