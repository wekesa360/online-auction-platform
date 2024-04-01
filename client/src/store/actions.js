// actions.js
import *  as actionTypes from './actionTypes';
import auctionService from '../services/auctionService';
import bidService from '../services/bidService';
import profileService from '../services/userService';
import auctioneerService from '../services/auctioneerService';
import authService from '../services/authService';


// Register action creator
export const register = (username, email, password, role) => async (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_REQUEST });
  try {
    const userData = await authService.register(username, email, password, role);
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: userData });
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error });
  }
};

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  try {
    const userData = await authService.login(username, password);
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: userData });
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error });
  }
};



// Logout action creator
export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
  try {
    await authService.logout();
    // Clear user data from the state
    localStorage.removeItem('authToken');
    dispatch({ type: actionTypes.LOGOUT });
  } catch (error) {
    // Handle logout error
  }
};

// Place bid action creator
export const placeBid = (auctionId, amount) => async (dispatch) => {
  dispatch({ type: actionTypes.PLACE_BID_REQUEST });
  try {
    const bidData = await bidService.createBid(auctionId, amount);
    dispatch({ type: actionTypes.PLACE_BID_SUCCESS, payload: bidData });
  } catch (error) {
    dispatch({ type: actionTypes.PLACE_BID_FAILURE, payload: error });
  }
};

// fetch all user Bids
export const fetchBids = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_BIDS_REQUEST });
  try {
    const bids = await bidService.getAllBids();
    dispatch({ type: actionTypes.FETCH_BIDS_SUCCESS, payload: bids });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_BIDS_FAILURE, payload: error });
  }
}

// closeBid and Auction 
export const closeBid = (bidId, auctionId) => async (dispatch) => {
  dispatch({ type: actionTypes.CLOSE_BID_REQUEST });
  try {
    const bids = await bidService.closeBid(bidId, auctionId);
    dispatch({ type: actionTypes.CLOSE_BID_SUCCESS, payload: bids });
  } catch (error) {
    dispatch({ type: actionTypes.CLOSE_BID_FAILURE, payload: error });
  }
}


//update bid
export const updateBid = (id, bidParam) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_BID_REQUEST });
  try {
    const bids = await bidService.getAllBids();
    dispatch({ type: actionTypes.UPDATE_BID_SUCCESS, payload: bids });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_BID_FAILURE, payload: error });
  }
};


// delete bid
export const deleteBid = (bidId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_BID_REQUEST });
  try {
    await bidService.deleteBid(bidId);
    dispatch({ type: actionTypes.DELETE_BID_SUCCESS, payload: bidId });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_BID_FAILURE, payload: error });
  }
};



// Create an auction
export const createAuction = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_AUCTION_REQUEST });
  try {
    const newAuction = await auctionService.createAuction(data);
    dispatch({ type: actionTypes.CREATE_AUCTION_SUCCESS, payload: newAuction });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_AUCTION_FAILURE, payload: error });
  }
};

// Edit auction action creator
export const updateAuction = (auctionId, updatedData) => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_AUCTION_REQUEST });
  try {
    const updatedAuction = await auctionService.editAuction(auctionId, updatedData);
    dispatch({ type: actionTypes.EDIT_AUCTION_SUCCESS, payload: updatedAuction });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_AUCTION_FAILURE, payload: error });
  }
};

// delete auction
export const deleteAuction = (auctionId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_AUCTION_REQUEST });
  try {
    await auctionService.deleteAuction(auctionId);
    dispatch({ type: actionTypes.DELETE_AUCTION_SUCCESS, payload: auctionId });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_AUCTION_FAILURE, payload: error });
  }
};

// Fetch all auctions action creator
export const fetchAuctions = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_AUCTIONS_REQUEST });
  try {
    const auctions = await auctionService.getAllAuctions();
    dispatch({ type: actionTypes.FETCH_AUCTIONS_SUCCESS, payload: auctions });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_AUCTIONS_FAILURE, payload: error });
  }
};


// Create auctioneer action creator
export const createAuctioneer = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_AUCTIONEER_REQUEST });
  try {
    const newAuctioneer = await auctioneerService.createAuctioneer(data);
    dispatch({ type: actionTypes.CREATE_AUCTIONEER_SUCCESS, payload: newAuctioneer });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_AUCTIONEER_FAILURE, payload: error });
  }
};

export const setIsRegisteredNow = (isRegistered) => {
  return {
    type: actionTypes.SET_IS_REGISTERED_NOW,
    payload: isRegistered,
  };
};

// fetchUserProfile 
export const fetchUserProfile = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_USER_PROFILE_REQUEST });
  try {
    const userProfile = await profileService.getProfile();
    console.log("We are here trying to debug the issue with the code below:: \n")
    dispatch({ type: actionTypes.FETCH_USER_PROFILE_SUCCESS, payload: userProfile });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_USER_PROFILE_FAILURE, payload: error });
  }
};

// updateUserProfile
export const updateUserProfile = (userId, updatedData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PROFILE_REQUEST });
  try {
    const userProfile = await profileService.updateProfile(userId, updatedData);
    dispatch({ type: actionTypes.UPDATE_USER_PROFILE_SUCCESS, payload: userProfile });
  } catch (error) {
    console.log("We are here trying to debug the issue with the code below:: \n", error)
    dispatch({ type: actionTypes.UPDATE_USER_PROFILE_FAILURE, payload: error });
  }
};

// createUserProfile
export const createUserProfile = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_USER_PROFILE_REQUEST });
  try {
    const userProfile = await profileService.createProfile(data);
    dispatch({ type: actionTypes.CREATE_USER_PROFILE_SUCCESS, payload: userProfile });
  } catch (error) {
    console.log("We are here trying to debug the issue with the code below:: \n", error)
    dispatch({ type: actionTypes.CREATE_USER_PROFILE_FAILURE, payload: error });
  }
};
 
// deleteUserAccount
export const deleteUserProfile = (userId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_USER_ACCOUNT_REQUEST });
  try {
    await profileService.deleteProfile(userId);
    dispatch({ type: actionTypes.DELETE_USER_ACCOUNT_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_USER_ACCOUNT_FAILURE, payload: error });
  }
};


// get all auctioneers
export const fetchAuctioneers = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_AUCTIONEERS_REQUEST });
  try {
    const auctioneers = await auctioneerService.getAllAuctioneers();
    dispatch({ type: actionTypes.FETCH_AUCTIONEERS_SUCCESS, payload: auctioneers });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_AUCTIONEERS_FAILURE, payload: error });
  }
}

// Edit auctioneer action creator
export const updateAuctioneer = (auctioneerId, updatedData) => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_AUCTIONEER_REQUEST });
  try {
    const updatedAuctioneer = await auctioneerService.updateAuctioneer(auctioneerId, updatedData);
    dispatch({ type: actionTypes.EDIT_AUCTIONEER_SUCCESS, payload: updatedAuctioneer });
    dispatch(fetchAuctioneers());
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_AUCTIONEER_FAILURE, payload: error });
  }
};


// Delete Auctioneer
export const deleteAuctioneer = (auctioneerId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_AUCTIONEER_REQUEST });
  try {
    await auctioneerService.deleteAuctioneer(auctioneerId);
    dispatch({ type: actionTypes.DELETE_AUCTIONEER_SUCCESS, payload: auctioneerId });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_AUCTIONEER_FAILURE, payload: error });
  }
};

// fetch auctioneer
export const fetchAuctioneer = (auctioneerId) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_AUCTIONEER_REQUEST });
  try {
    const auctioneers = await auctioneerService.getAllAuctioneers(auctioneerId);
    dispatch({ type: actionTypes.FETCH_AUCTIONEER_SUCCESS, payload: auctioneers });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_AUCTIONEER_FAILURE, payload: error });
  }
}

export const deleteAuctioneerSuccess = (auctioneerId) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_AUCTIONEER_SUCCESS, payload: auctioneerId });
}