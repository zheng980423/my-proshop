import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FORGOTPASSWORD_FAIL,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_RESET,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESETPASSWORD_FAIL,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_RESET,
  USER_RESETPASSWORD_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOTPASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOTPASSWORD_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case USER_FORGOTPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_FORGOTPASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESETPASSWORD_REQUEST:
      return { loading: true };
    case USER_RESETPASSWORD_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case USER_RESETPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESETPASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
export const userFollowReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FOLLOW_REQUEST:
      return { loading: true };
    case USER_FOLLOW_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case USER_FOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userUnfollowReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UNFOLLOW_REQUEST:
      return { loading: true };
    case USER_UNFOLLOW_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case USER_UNFOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
