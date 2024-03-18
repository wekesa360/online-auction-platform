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
    if (error.code === "ERR_NETWORK") {
      throw new Error(actionTypes.NETWORK_ERROR)
    }
    if (error.message === "Username or email is already taken") {
      throw new Error(actionTypes.INCORRECT_USERNAME);
    } else if (error.message === "internal_error") {
      throw new Error(actionTypes.INTERNAL_ERROR);
    } else {
      dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error });
    }
  }
};

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  try {
    const userData = await authService.login(username, password);
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: userData });
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new Error(actionTypes.NETWORK_ERROR)
    }
    if (error.message === "Incorrect password") {
      throw new Error(actionTypes.INCORRECT_PASSWORD);
    } else if (error.message === "internal_error") {
      throw new Error(actionTypes.INTERNAL_ERROR);
    }
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
    const bidData = await bidService.placeBid(auctionId, amount);
    dispatch({ type: actionTypes.PLACE_BID_SUCCESS, payload: bidData });
  } catch (error) {
    dispatch({ type: actionTypes.PLACE_BID_FAILURE, payload: error.message });
  }
};

// Create an auction
export const createAuction = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_AUCTION_REQUEST });
  try {
    const newAuction = await auctionService.createAuction(data);
    dispatch({ type: actionTypes.CREATE_AUCTION_SUCCESS, payload: newAuction });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_AUCTION_FAILURE, payload: error.message });
  }
};

// Edit auction action creator
export const editAuction = (auctionId, updatedData) => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_AUCTION_REQUEST });
  try {
    const updatedAuction = await auctionService.editAuction(auctionId, updatedData);
    dispatch({ type: actionTypes.EDIT_AUCTION_SUCCESS, payload: updatedAuction });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_AUCTION_FAILURE, payload: error.message });
  }
};

// Edit user profile action creator
export const editUserProfile = (userId, updatedData) => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_USER_PROFILE_REQUEST });
  try {
    const updatedProfile = await profileService.editUserProfile(userId, updatedData);
    dispatch({ type: actionTypes.EDIT_USER_PROFILE_SUCCESS, payload: updatedProfile });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_USER_PROFILE_FAILURE, payload: error.message });
  }
};

// Create auctioneer action creator
export const createAuctioneer = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_AUCTIONEER_REQUEST });
  try {
    const newAuctioneer = await auctioneerService.createAuctioneer(data);
    dispatch({ type: actionTypes.CREATE_AUCTIONEER_SUCCESS, payload: newAuctioneer });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_AUCTIONEER_FAILURE, payload: error.message });
  }
};

// Edit auctioneer action creator
export const editAuctioneer = (auctioneerId, updatedData) => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_AUCTIONEER_REQUEST });
  try {
    const updatedAuctioneer = await auctioneerService.editAuctioneer(auctioneerId, updatedData);
    dispatch({ type: actionTypes.EDIT_AUCTIONEER_SUCCESS, payload: updatedAuctioneer });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_AUCTIONEER_FAILURE, payload: error.message });
  }
};




