import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import MyOrders from './screens/MyOrders';
import CartScreen from './screens/CartScreen';
import Login from './screens/Login';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
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

import MessengerScreen from './screens/MessengerScreen';

import MainLayout from './components/MainLayout';
import DashboardLayout from './components/DashboardLayout';
import SwitchBase from '@material-ui/core/internal/SwitchBase';

const useStyles = makeStyles(theme => {
  return {
    toolbar: theme.mixins.toolbar,
    main: { padding: theme.spacing(3) },
  };
});

const MessengerLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <DashboardLayout>
          <Component {...matchProps} />
        </DashboardLayout>
      )}
    />
  );
};
const MainLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <MainLayoutRoute path="/product/:id" component={ProductScreen} />
        <MainLayoutRoute path="/cart/:id?" component={CartScreen} />
        <MainLayoutRoute path="/login" component={Login} />
        <MainLayoutRoute path="/register" component={RegisterScreen} />
        <MainLayoutRoute path="/profile" component={ProfileScreen} />
        <MainLayoutRoute path="/shipping" component={ShippingSceen} />
        <MainLayoutRoute path="/payment" component={PaymentScreen} />
        <MainLayoutRoute path="/placeorder" component={PlaceOrderScreen} />
        <MainLayoutRoute path="/order/:id" component={OrderScreen} />
        <MainLayoutRoute path="/myorders" component={MyOrders} />
        <MainLayoutRoute path="/admin/users" component={UserListScreen} />
        <MainLayoutRoute
          path="/admin/products"
          exact
          component={ProductListScreen}
        />
        <MainLayoutRoute
          path="/admin/products/:pageNumber"
          component={ProductListScreen}
          exact
        />
        <MainLayoutRoute path="/admin/orders" component={OrderListScreen} />
        <MainLayoutRoute
          path="/admin/product/:id/edit"
          component={ProductEditScreen}
        />
        <MainLayoutRoute
          path="/admin/user/:id/edit"
          component={UserEditScreen}
        />

        <MainLayoutRoute
          path="/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <MainLayoutRoute path="/" exact component={HomeScreen} />
        <MainLayoutRoute
          path="/admin/login"
          exact
          component={AdminLoginSceen}
        />
        <MainLayoutRoute
          path="/forgotpassword"
          exact
          component={ForgotPasswordScreen}
        />
        <MainLayoutRoute
          path="/resetpassword/:resettoken"
          component={ResetPasswordSceen}
        />
        <MessengerLayoutRoute
          path="/messenger"
          component={MessengerScreen}
          exact
        />
        {/* <Switch>
        <DashboardLayout>
          <Switch>
            <Route path="/messenger" component={MessengerScreen} exact />
          </Switch>
        </DashboardLayout>
      </Switch> */}
      </Switch>
    </Router>
  );
};

export default App;
