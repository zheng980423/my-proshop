import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productRelatedReducer,
} from './reducers/productReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from './reducers/orderReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userListReducer,
  userDeleteReducer,
  adminUserDetailReducer,
  adminUserUpdateReducer,
  adminProductDeleteReducer,
  adminProductCreateReducer,
  adminProductDetailsReducer,
  adminProducUpdateReducer,
  adminOrderListReducer,
  adminOrderDeliverReducer,
} from './reducers/adminReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userFollowReducer,
  userUnfollowReducer,
} from './reducers/userReducers';
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productRelated: productRelatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userFollow: userFollowReducer,
  userUnfollow: userUnfollowReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  adminUserDetail: adminUserDetailReducer,
  adminUserUpdate: adminUserUpdateReducer,
  adminProductDelete: adminProductDeleteReducer,
  adminProductCreate: adminProductCreateReducer,
  adminProductDetails: adminProductDetailsReducer,
  adminProductUpdate: adminProducUpdateReducer,
  adminOrderList: adminOrderListReducer,
  adminOrderDeliver: adminOrderDeliverReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
