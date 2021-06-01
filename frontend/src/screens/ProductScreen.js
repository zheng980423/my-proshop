import {
  Button,
  Card,
  CardMedia,
  makeStyles,
  Typography,
  Grow,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating';
import { red } from '@material-ui/core/colors';

import { listProductDetails, listProducts } from '../actions/productActions';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import Message from '../components/Message';

const useStyles = makeStyles(theme => ({
  media: {
    paddingTop: '56.25%', // 16:9
    height: '200px',
    maxWidth: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  description: {
    padding: theme.spacing(2),
  },

  margin: {
    margin: theme.spacing(2),
    marginLeft: '0px',
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

  grid1: {},
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const productList = useSelector(state => state.productList);
  const { products } = productList;
  useEffect(() => {
    dispatch(listProducts());
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const openPost = _id => history.push(`/product/${_id}`);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const filterRule = x => {
    const category = product.category;
    return x.category === category && x._id !== match.params.id;
  };
  console.log(product.category);
  const recommendedProducts = products.filter(filterRule);

  return (
    <>
      <Button
        className={classes.margin}
        style={{ marginBottom: '1.5rem' }}
        component={RouterLink}
        to="/"
      >
        Go Back
      </Button>

      {loading ? (
        [1, 2, 3, 4, 5].map(n => <SkeletonArticle key={n}></SkeletonArticle>)
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Grow in>
          <Container className={classes.container}>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
              className={classes.grid}
            >
              <Grid item xs={12} sm={12} md={7}>
                <Card className={classes.mediaCard}>
                  <CardMedia
                    className={classes.media}
                    image={
                      product.image ? product.image : '/images/airpods.jpg'
                    }
                    title={product.name}
                  />
                </Card>
              </Grid>
              <Grid className={classes.grid2} item xs={12} sm={12} md={5}>
                <Paper className={classes.paper} elevation={0}>
                  <div className={classes.description}>
                    <Typography
                      variant="h5"
                      className={classes.name}
                      component="h1"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.description}
                    </Typography>
                  </div>

                  <List component="div" aria-label="mailbox folders">
                    <ListItem>
                      <Typography className={classes.price}>
                        ${product.price}
                      </Typography>
                    </ListItem>
                    <Divider light />
                    <ListItem>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListItem>
                    <Divider light />
                  </List>
                </Paper>
                <Paper className={classes.paper}>
                  <List
                    component="div"
                    className={classes.root}
                    aria-label="mailbox folders"
                  >
                    <ListItem className={classes.listitem} button>
                      <Typography>价格：</Typography>
                      <Typography>${product.price}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.listitem} button divider>
                      <Typography>状态:</Typography>
                      <Typography>
                        {product.countInStock > 0 ? '有库存' : '售罄'}
                      </Typography>
                    </ListItem>
                    <ListItem className={classes.listitem}>
                      <Typography>数量:</Typography>
                      <FormControl
                        variant="filled"
                        disabled={product.countInStock === 0}
                      >
                        <InputLabel htmlFor="filled-age-native-simple">
                          {product.countInStock > 0 ? '数量' : '0'}
                        </InputLabel>
                        <Select
                          native
                          value={qty}
                          onChange={e => setQty(e.target.value)}
                          inputProps={{
                            name: 'qty',
                            id: 'filled-qty',
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Select>
                        {product.countInStock > 0 ? (
                          ''
                        ) : (
                          <FormHelperText>已售罄</FormHelperText>
                        )}
                      </FormControl>
                    </ListItem>
                    <Divider light />
                    {product.countInStock === 0 ? (
                      <Message variant="info">
                        该商品已经售罄啦，看看其他商品哦
                      </Message>
                    ) : (
                      <ListItem className={classes.listitem}>
                        <Typography style={{ width: '100%' }}>
                          <Button
                            startIcon={<AddShoppingCartIcon />}
                            onClick={addToCartHandler}
                            variant="contained"
                            color="primary"
                            className={classes.addtocartbtn}
                            disabled={product.countInStock === 0}
                          >
                            添加到购物车
                          </Button>
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
            </Grid>

            {!!recommendedProducts.length && (
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">
                  您可能也会喜欢
                </Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                  {recommendedProducts.map(
                    ({ rating, price, numReviews, name, image, _id }) => (
                      <div
                        style={{
                          margin: '20px 20px 20px 0px',
                          cursor: 'pointer',
                        }}
                        onClick={() => openPost(_id)}
                        key={_id}
                      >
                        <Typography gutterBottom variant="h4">
                          {name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          {price}
                        </Typography>
                        <img src={image} alt={name} width="200px" />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </Container>
        </Grow>
      )}
    </>
  );
};

export default ProductScreen;
