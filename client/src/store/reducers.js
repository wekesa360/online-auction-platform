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
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
    default:
      return state;
  }
};

// Profile reducer
const profileInitialState = {
  loading: false,
  error: null,
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
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
    case actionTypes.EDIT_AUCTIONEER_SUCCESS:
      // Handle success action if needed
      return {
        ...state,
        loading: false,
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

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  bid: bidReducer,
  profile: profileReducer,
  auctioneer: auctioneerReducer,
  // Add other reducers here if needed
});

export default rootReducer;
