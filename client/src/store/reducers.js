// reducers.js

import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

// Authentication reducer
const authInitialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  isRegisteredNow: false,
  isAdminFirstLogin: false,
};


const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isRegisteredNow: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      const isAdmin = action.payload.role === 'admin';
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null,
        isAdminFirstLogin: isAdmin && state.isRegisteredNow, // Check if admin is logging in for the first time
      };
      case actionTypes.SET_IS_REGISTERED_NOW:
        return {
          ...state,
          isRegisteredNow: action.payload,
        };
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// Bid reducer
const bidInitialState = {
  loading: false,
  error: null,
};

const bidReducer = (state = bidInitialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_BID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.PLACE_BID_SUCCESS:
      // Handle success action if needed
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.PLACE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      // handle fetch bids
    case actionTypes.FETCH_BIDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CLOSE_BID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CLOSE_BID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case actionTypes.CLOSE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.FETCH_BIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        bids: action.payload,
        error: null,
      };
    case actionTypes.FETCH_BIDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Profile reducer
const profileInitialState = {
  profile: null,
  bidderProfile: null,
  loading: false,
  error: null,
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.EDIT_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.EDIT_USER_PROFILE_SUCCESS:
      // Handle success action if needed
      return {
        ...state,
        loading: false,
        error: null,
      };

    case actionTypes.GET_BIDDER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_BIDDER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_BIDDER_PROFILE_SUCCESS:
      return {
        ...state,
        bidderProfile: action.payload,
        loading: false,
        error: null,
      }
    case actionTypes.CREATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_USER_PROFILE_SUCCESS:
      // Handle success action if needed
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,

      }

    case actionTypes.EDIT_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Auctioneer reducer
const auctioneerInitialState = {
  auctioneers: [],
  isAuctioneerCreated: false,
  isAuctioneerEdited: false,
  loading: true,
  error: null,
};

const auctioneerReducer = (state = auctioneerInitialState, action) => {
  switch (action.type) {
    // case fetsch auctioneers
    case actionTypes.FETCH_AUCTIONEER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_AUCTIONEERS_SUCCESS:
      // Handle success action if needed
      return {
        ...state,
        auctioneers: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_AUCTIONEER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CREATE_AUCTIONEER_REQUEST:
    case actionTypes.EDIT_AUCTIONEER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_AUCTIONEER_SUCCESS:
       // Handle success action if needed
       return {
        ...state,
        loading: false,
        isAuctioneerCreated: true,
        error: null,
      };
    case actionTypes.EDIT_AUCTIONEER_SUCCESS:
      // Handle success action if needed
      return {
        ...state,
        loading: false,
        isAuctioneerEdited: true,
        error: null,
      };
    case actionTypes.CREATE_AUCTIONEER_FAILURE:
    case actionTypes.EDIT_AUCTIONEER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case actionTypes.DELETE_AUCTIONEER_SUCCESS:
        return {
          ...state,
          auctioneers: state.auctioneers.filter(auctioneer => auctioneer.id !== action.payload),
        };
    default:
      return state;
  }
};

// Auction Reducer 
const auctionInitialState = {
  auctions: [],
  loading: true,
  error: null,
};

const auctionReducer = (state = auctionInitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AUCTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_AUCTIONS_SUCCESS:
      return {
        ...state,
        auctions: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_AUCTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CREATE_AUCTION_REQUEST:
    case actionTypes.EDIT_AUCTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_AUCTION_SUCCESS:
    case actionTypes.EDIT_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_AUCTION_FAILURE:
    case actionTypes.EDIT_AUCTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.DELETE_AUCTION_SUCCESS:
      return {
        ...state,
        auctions: state.auctions.filter(auction => auction.id !== action.payload),
      };
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  bid: bidReducer,
  auction: auctionReducer,
  profile: profileReducer,
  auctioneer: auctioneerReducer,
  // Add other reducers here if needed
});

export default rootReducer;
