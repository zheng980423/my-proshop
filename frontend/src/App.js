import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import MyOrders from './screens/MyOrders';
import CartScreen from './screens/CartScreen';
import Login from './screens/Login';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingSceen from './screens/ShippingSceen';
import PaymentScreen from './screens/PaymentScreen';
import UserListScreen from './screens/UserListScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListSceen';
import AdminLoginSceen from './adminScreen/AdminLoginSceen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordSceen from './screens/ResetPasswordSceen';
import MainLayout from './components/MainLayout';
// const DashBoardLayoutRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <DashboardLayout>
//           <Component {...matchProps} />
//         </DashboardLayout>
//       )}
//     />
//   );
// };
// const MainLayoutRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={matchProps => (
//         <MainLayout>
//           <Component {...matchProps} />
//         </MainLayout>
//       )}
//     />
//   );
// };

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipping" component={ShippingSceen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/myorders" component={MyOrders} />

        <Route path="/admin/products" exact component={ProductListScreen} />
        <Route
          path="/admin/products/:pageNumber"
          component={ProductListScreen}
          exact
        />
        <Route path="/admin/orders" component={OrderListScreen} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/users" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />

        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route path="/" exact component={HomeScreen} />
        <Route path="/admin/login" exact component={AdminLoginSceen} />
        <Route path="/forgotpassword" exact component={ForgotPasswordScreen} />
        <Route
          path="/resetpassword/:resettoken"
          component={ResetPasswordSceen}
        />
        {/* <DashBoardLayoutRoute
          path="/messenger"
          component={MessengerScreen}
          exact
        /> */}
        {/* <Route component={NotFound} /> */}
        {/* <Switch>
        <DashboardLayout>
          <Switch>
            <Route path="/messenger" component={MessengerScreen} exact />
          </Switch>
        </DashboardLayout>
      </Switch> */}
      </MainLayout>
    </Router>
  );
};

export default App;
