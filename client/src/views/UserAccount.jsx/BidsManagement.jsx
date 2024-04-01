import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BidManagement.css";
import AuctionDetailsModal from "../../components/auctions/AuctionDetailsModal/AuctionDetailsModal";
import { deleteBid, updateBid, fetchBids } from "../../store/actions";

const BidManagement = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bid.loading);
  const bids = useSelector((state) => state.bid.bids);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.bid.error);

  useEffect(() => {
    dispatch(fetchBids());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidderName, setBidderName] = useState("");
  const [bidTime, setBidTime] = useState("");
  const [viewItem, setViewItem] = useState(null);

  const handleEdit = (bid) => {
    setSelectedBid(bid);
    setBidAmount(bid.amount);
    setBidderName(user.email);
    setBidTime(bid.timestamp);
    setShowAddForm(true);
    setEditMode(true);
  };

  const handleDelete = (bidId) => {
    dispatch(deleteBid(bidId));
  };

  const handleViewItem = (auction) => {
    const updatedAuction = {
      ...auction,
      bidStarts: `${auction.startingDate} ${auction.startingTime}`,
      bidEnds: formatDateAndTime(auction.endDate, auction.endTime),
      currentBid:
        auction.bids.length > 0
          ? `Ksh ${new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(auction.bids[0].amount)}`
          : "Ksh 0",
    };
    setViewItem(updatedAuction);
  };

  function formatDateAndTime(date, time) {
    const auctionDateTime = `${date}T${time}`;
    const formattedDateTime = `${
      auctionDateTime.toString().split("T")[0]
    } at ${time}`;
    return formattedDateTime;
  }

  const handleCloseModal = () => {
    setViewItem(null);
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4">
      <h2>Bids</h2>
      {/* <button
        className="btn btn-primary "
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Close Form" : ""}
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
            <th>Item</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {bids ? (
            bids.map((bid) => (
              <tr key={bid.id}>
                <td>
                  {new Intl.NumberFormat("en-KE", {
                    style: "currency",
                    currency: "KES",
                  }).format(bid.amount)}
                </td>
                <td>{bid.auction ? bid.auction.title : "N/A"}</td>
                <td>{new Date(bid.timestamp).toLocaleString()}</td>
                <td>
                  {/* <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleEdit(bid)}
                  >
                    View
                  </button> */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(bid.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewItem(bid.auction)}
                  >
                    view Item
                  </button>
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
      {viewItem && (
        <AuctionDetailsModal auction={viewItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default BidManagement;
