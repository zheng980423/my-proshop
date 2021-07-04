import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import { ReactComponent as PlaceOrderSvg } from '../svgs/placeOrder.svg';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grow,
  ListItemAvatar,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';

import Message from '../components/Message';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'space-between',
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatar: { paddingRight: '1rem' },
  paper: { padding: theme.spacing(2) },
  addtocartbtn: { width: '100%' },
}));

export default function PlaceOrderScreen({ history }) {
  const classes = useStyles();
  const disaptch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { name } = userInfo;
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const smallScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // calculate Prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 6);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;
  const placeOrderHandler = () => {
    disaptch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success, userInfo]);
  return (
    <Grow in>
      <Box
        style={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <React.Fragment>
            <CheckoutSteps activeStep={3}></CheckoutSteps>
            <Typography variant="h5" gutterBottom>
              已订商品
            </Typography>
            <List disablePadding>
              {cartItems.length === 0 ? (
                <Message variant="info">您的购物车是空的</Message>
              ) : (
                <>
                  {cartItems.map((item, index) => (
                    <ListItem className={classes.listItem} key={item.name}>
                      <ListItemAvatar className={classes.avatar}>
                        <Avatar
                          alt={item.name}
                          variant="rounded"
                          className={classes.large}
                          src={item.image}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <Typography variant="body2">
                        {item.qty} x ${item.price} =${item.qty * item.price}
                      </Typography>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
            <Paper className={classes.paper}>
              <Grid container justify="center" align="center" spacing={3}>
                <Grid item xs={12} md={6}>
                  <PlaceOrderSvg
                    style={{
                      height: largeScreen
                        ? '500px'
                        : smallScreen
                        ? '400px'
                        : '200px',
                      width: largeScreen
                        ? '500px'
                        : smallScreen
                        ? '400px'
                        : '200px',
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    display: 'flex',

                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div>
                    <List disablePadding>
                      <ListItem className={classes.listItem} button>
                        <Typography variant="h5">订单详细</Typography>
                      </ListItem>
                      <Divider />
                      <ListItem className={classes.listItem} button divider>
                        <Typography>商品总价:</Typography>
                        <Typography>${cart.itemsPrice}</Typography>
                      </ListItem>
                      <ListItem className={classes.listItem} button divider>
                        <Typography>邮寄价格:</Typography>
                        <Typography>${cart.shippingPrice}</Typography>
                      </ListItem>
                      <ListItem className={classes.listItem} button divider>
                        <Typography>税价:</Typography>
                        <Typography>${cart.taxPrice}</Typography>
                      </ListItem>
                      <ListItem className={classes.listItem} button divider>
                        <Typography>总计:</Typography>
                        <Typography>${cart.totalPrice}</Typography>
                      </ListItem>

                      {error && (
                        <ListItem className={classes.listItem} button divider>
                          <Message variant="error">{error}</Message>{' '}
                        </ListItem>
                      )}

                      <ListItem className={classes.listItem}>
                        <Typography style={{ width: '100%' }}>
                          <Button
                            // endIcon={<ArrowRightAltIcon />}
                            variant="contained"
                            color="primary"
                            className={classes.addtocartbtn}
                            disabled={cartItems.length === 0}
                            onClick={placeOrderHandler}
                          >
                            下单
                          </Button>
                        </Typography>
                      </ListItem>
                    </List>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  <HomeIcon />
                  邮寄地址
                </Typography>
                <Typography gutterBottom>{name}</Typography>
                <Typography gutterBottom>
                  {shippingAddress.address},{shippingAddress.city},
                  {shippingAddress.postalCode},{shippingAddress.country}
                </Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  支付详情
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography gutterBottom>支付方式</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{paymentMethod}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        </Container>
      </Box>
    </Grow>
  );
}
