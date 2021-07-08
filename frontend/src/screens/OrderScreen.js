import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
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
  Typography,
} from '@material-ui/core';
import SkeletonArticle from '../skeletons/SkeletonArticle';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { deliverOrder } from '../actions/adminActions';
import Message from '../components/Message';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { ADMIN_ORDER_DELIVER_RESET } from '../constants/adminConstants';
import moment from 'moment';

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

export default function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  const classes = useStyles();

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const adminOrderDeliver = useSelector(state => state.adminOrderDeliver);
  const { loading: loadingDeliver, success: successDeliver } =
    adminOrderDeliver;

  if (!loading) {
    //   Calculate prices
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ADMIN_ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, history, userInfo, orderId, successPay, order, successDeliver]);

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliverHandler = paymentResult => {
    dispatch(deliverOrder(order));
  };

  return loading || loadingDeliver ? (
    <SkeletonArticle />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <React.Fragment>
            <Typography variant="h4">订单号：{order._id}</Typography>
            <Typography variant="h5" gutterBottom>
              已订商品
            </Typography>
            <List disablePadding>
              {order.orderItems.length === 0 ? (
                <Message variant="info">您的订单是空的</Message>
              ) : (
                <>
                  {order.orderItems.map((item, index) => (
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
                  <Typography>${order.itemsPrice}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} button divider>
                  <Typography>邮寄价格:</Typography>
                  <Typography>${order.shippingPrice}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} button divider>
                  <Typography>税价:</Typography>
                  <Typography>${order.taxPrice}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} button divider>
                  <Typography>总计:</Typography>
                  <Typography>${order.totalPrice}</Typography>
                </ListItem>
                {/* 
                {!order.isPaid && (
                  <ListItem className={classes.listItem}>
                    {loadingPay && <SkeletonArticle />}
                    {!sdkReady ? (
                      <SkeletonArticle />
                    ) : (
                      <Typography style={{ width: '100%' }}>
                        <PaypalButton
                          amount={order.totalPrice}
                          className={classes.addtocartbtn}
                          onSuccess={successPaymentHandler}
                        />
                      </Typography>
                    )}
                  </ListItem>
                )} */}
                {!order.isPaid && (
                  <ListItem className={classes.listItem}>
                    {loadingPay && <SkeletonArticle />}
                    {!sdkReady ? (
                      <SkeletonArticle />
                    ) : (
                      <Typography component="div" style={{ width: '100%' }}>
                        <PayPalButton
                          className={classes.addtocartbtn}
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </Typography>
                    )}
                  </ListItem>
                )}
                {userInfo.role === 'admin' &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListItem className={classes.listItem}>
                      <Typography component="div" style={{ width: '100%' }}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={deliverHandler}
                        >
                          设置成已发货
                        </Button>
                      </Typography>
                    </ListItem>
                  )}
              </List>
            </Paper>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  邮寄详情
                </Typography>

                <Grid container>
                  <Grid item xs={6}>
                    <Typography gutterBottom>用户姓名</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{order.user.name}</Typography>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography gutterBottom>用户邮箱</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{order.user.email}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography gutterBottom>邮寄地址</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city},
                        {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {order.isDelivered ? (
                  <Message variant="success">
                    已于{moment(order.createdAt).format('l')}发货
                  </Message>
                ) : (
                  <Message variant="error">还没发货</Message>
                )}
              </Grid>
              <Grid item container direction="column" xs={12} sm={12} md={6}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  支付详情
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography gutterBottom>支付方式</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{order.paymentMethod}</Typography>
                  </Grid>
                </Grid>
                {order.isPaid ? (
                  <Message variant="success">
                    已于 {moment(order.paidAt).format('l')}支付
                  </Message>
                ) : (
                  <Message variant="error">还没支付</Message>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        </Container>
      </Box>
    </>
  );
}
