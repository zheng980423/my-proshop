import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as AddToCartSvg } from '../svgs/addToCart.svg';
import {
  makeStyles,
  Grow,
  Container,
  Grid,
  List,
  ListItem,
  Divider,
  Select,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  FormControl,
  Button,
  Link,
  useMediaQuery,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Message from '../components/Message';
import { Link as RouterLink } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

const useStyles = makeStyles(theme => ({
  media: {
    paddingTop: '56.25%', // 16:9
    height: '50px',
    maxWidth: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  description: {
    padding: theme.spacing(2),
  },
  title: {
    padding: ' 0 0 1.5rem 0',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  new: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  margin: {
    margin: theme.spacing(2),
    marginLeft: '0px',
    // margin: theme.spacing(1),
  },
  price: {
    color: red[500],
    fontSize: '1.5rem',
  },
  container: {
    padding: '0px',
  },
  name: {
    paddingBottom: theme.spacing(2),
  },
  listitem: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  addtocartbtn: { width: '100%' },

  paper: { padding: theme.spacing(2) },
  grid2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  avatar: { paddingRight: '1rem' },
  remove: {
    marginRight: '1rem',
  },

  grid1: {},
}));
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const smallScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const classes = useStyles();
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <>
      <IconButton
        className={classes.margin}
        style={{ marginBottom: '1.5rem' }}
        component={RouterLink}
        to="/"
      >
        <ArrowBackIcon />
      </IconButton>

      <div className={classes.new}>
        <LocalMallIcon color="secondary" />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}> 购物车</span>
      </div>
      <Grow in>
        <Container className={classes.container}>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.grid}
          >
            {cartItems.length === 0 ? (
              <Grid item xs={12} sm={12} md={7}>
                <Message variant="info">
                  您的购物车是空的 <Link to="/">返回</Link>
                </Message>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={7}>
                <div className={classes.demo}>
                  <List>
                    {cartItems.map(item => (
                      <div key={item.product}>
                        <ListItem className={classes.item}>
                          <ListItemAvatar className={classes.avatar}>
                            <Avatar
                              alt={item.name}
                              variant="rounded"
                              className={classes.large}
                              src={item.image}
                            ></Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            className={classes.text}
                            primary={item.name}
                          />

                          <ListItemText
                            className={classes.text}
                            primary={item.price}
                          />
                          <FormControl variant="filled">
                            <Select
                              className={classes.remove}
                              native
                              value={item.qty}
                              onChange={e =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                              inputProps={{
                                name: 'qty',
                                id: 'filled-qty',
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                removeFromCartHandler(item.product);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </List>
                </div>
              </Grid>
            )}

            <Grid className={classes.grid2} item xs={12} sm={12} md={5}>
              <Paper className={classes.paper}>
                <Grid container justify="center" align="center" spacing={3}>
                  <Grid item xs={12} md={12}>
                    <AddToCartSvg
                      style={{
                        height: largeScreen
                          ? '365px'
                          : smallScreen
                          ? '420px'
                          : '200px',
                        width: largeScreen
                          ? '365px'
                          : smallScreen
                          ? '400px'
                          : '200px',
                      }}
                    />
                  </Grid>
                </Grid>
                <List
                  component="div"
                  className={classes.root}
                  aria-label="mailbox folders"
                >
                  <ListItem className={classes.listitem} button>
                    {/* <Typography>价格：</Typography> */}
                    <Typography variant="h5">
                      共计 ({' '}
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)} )
                      件商品
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem className={classes.listitem} button divider>
                    <Typography>总价格:</Typography>
                    <Typography>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listitem}>
                    <Typography style={{ width: '100%' }}>
                      <Button
                        endIcon={<ArrowRightAltIcon />}
                        variant="contained"
                        color="primary"
                        className={classes.addtocartbtn}
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        继续
                      </Button>
                    </Typography>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default CartScreen;
