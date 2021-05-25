import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  ListItemAvatar,
  Paper,
} from '@material-ui/core';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Message from '../components/Message';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA',
];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatar: { paddingRight: '1rem' },
  paper: { padding: theme.spacing(2) },
  addtocartbtn: { width: '100%' },
}));

export default function PlaceOrderScreen() {
  const classes = useStyles();
  const disaptch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { name } = userInfo;

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
  const placeOrderHandler = () => {};
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
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
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom className={classes.title}>
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
  );
}