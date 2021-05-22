import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';
import axios from 'axios';
export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // setTimeout(async () => {
    //   const { data } = await axios.get('/api/products');

    //   dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    // }, 3000);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// export const listProductDetails = id => async dispatch => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });
//     // setTimeout(async () => {
//     //   const { data } = await axios.get('/api/products');

//     //   dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
//     // }, 3000);

//     let { data } = await axios.get(`/api/products/${id}`);
//     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
