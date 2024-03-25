import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BidManagement.css"; // Update the CSS file name
import {
  deleteBid,
  updateBid,
  createBid,
  fetchBids,
} from "../../store/actions"; // Update the action imports

const BidManagement = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bid.loading); // Update state selectors
  const bids = useSelector((state) => state.bid.bids); // Update state selectors
  const user = useSelector((state) => state.auth.user); // Update state selectors
  const error = useSelector((state) => state.bid.error); // Update state selectors

  console.log(user);

  useEffect(() => {
    dispatch(fetchBids());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bidAmount, setBidAmount] = useState(""); // Update state variable name
  const [bidderName, setBidderName] = useState(""); // Update state variable name
  const [bidTime, setBidTime] = useState(""); // Update state variable name

  const handleEdit = (bid) => {
    setSelectedBid(bid);
    setBidAmount(bid.amount); // Update state variable name
    setBidderName(user.email); // Update state variable name
    setBidTime(bid.timestamp); // Update state variable name
    setShowAddForm(true);
    setEditMode(true);
  };

  const handleDelete = (bidId) => {
    dispatch(deleteBid(bidId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBid = {
      amount: bidAmount,
      bidderName,
      time: bidTime,
    };

    if (editMode) {
      await dispatch(updateBid(selectedBid.id, newBid));
      setEditMode(true);
    }

    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setBidAmount("");
    setBidderName("");
    setBidTime("");
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
      <h2>Bids</h2>
      {/* <button
        className="btn btn-primary"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Close Form" : "Add Bid"}
      </button> */}
      {showAddForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bidderName" className="form-label">
              Bidder Name
            </label>
            <input
              type="text"
              className="form-control"
              id="bidderName"
              value={bidderName}
              onChange={(e) => setBidderName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="time"
              value={bidTime}
              onChange={(e) => setBidTime(e.target.value)}
              required
            />
          </div>
          {/* <button type="submit" className="btn btn-primary">
            {editMode ? "Update Bid" : "Add Bid"}
          </button> */}
        </form>
      )}
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Bidder Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {bids ? (
            bids.map((bid) => (
              <tr key={bid.id}>
                <td>{bid.amount}</td>
                <td>{bid.bidderName}</td>
                <td>{bid.time}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleEdit(bid)}
                  >
                    View
                  </button>
                  {/* <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(bid.id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No bids available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BidManagement;
