import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  ADMIN_USER_DETAIL_REQUEST,
  ADMIN_USER_DETAIL_SUCCESS,
  ADMIN_USER_DETAIL_FAIL,
  ADMIN_USER_DETAIL_RESET,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_RESET,
  ADMIN_PRODUCT_DELETE_REQUEST,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAIL,
  ADMIN_PRODUCT_CREATE_REQUEST,
  ADMIN_PRODUCT_CREATE_SUCCESS,
  ADMIN_PRODUCT_CREATE_FAIL,
  ADMIN_PRODUCT_CREATE_RESET,
  ADMIN_PRODUCT_DETAIL_REQUEST,
  ADMIN_PRODUCT_DETAIL_SUCCESS,
  ADMIN_PRODUCT_DETAIL_FAIL,
  ADMIN_PRODUCT_UPDATE_REQUEST,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
  ADMIN_PRODUCT_UPDATE_RESET,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_DELIVER_REQUEST,
  ADMIN_ORDER_DELIVER_SUCCESS,
  ADMIN_ORDER_DELIVER_FAIL,
  ADMIN_ORDER_DELIVER_RESET,
} from '../constants/adminConstants';

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminUserDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case ADMIN_USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case ADMIN_USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USER_DETAIL_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const adminUserUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};
export const adminProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const adminProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case ADMIN_PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ADMIN_PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };
    case ADMIN_PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ADMIN_PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const adminProducUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case ADMIN_PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
export const adminOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ADMIN_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const adminOrderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
