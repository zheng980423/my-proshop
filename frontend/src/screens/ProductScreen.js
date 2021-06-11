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
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
  Box,
  TextField,
  MenuItem,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
// import Rating from '../components/Rating';
import Rating from '@material-ui/lab/Rating';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import {
  listProductDetails,
  createProductReview,
  listRelatedProducts,
} from '../actions/productActions';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

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
  comment: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
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
  ratingRoot: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const ratingOption = [
    {
      rating: 1,
      des: '差劲',
    },
    {
      rating: 2,
      des: '一般般',
    },
    {
      rating: 3,
      des: '不错',
    },
    {
      rating: 4,
      des: '非常好',
    },
    {
      rating: 5,
      des: '物美价廉',
    },
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  const productRelated = useSelector(state => state.productRelated);
  const {
    loading: loadingRelated,
    error: errorRelated,
    products: relatedProducts,
  } = productRelated;
  useEffect(() => {
    if (successProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
    dispatch(listRelatedProducts(match.params.id));
  }, [dispatch, match.params.id, successProductReview]);

  const openPost = _id => history.push(`/product/${_id}`);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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
                        name="product-rating"
                        disabled
                      />
                      {`${product.numReviews} 评论`}
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
              {/* 评论区 */}
              <Grid className={classes.grid2} item xs={12} sm={12} md={12}>
                <Paper className={classes.comment} elevation={0}>
                  <Typography gutterBottom variant="h5">
                    评论区
                  </Typography>
                  <Divider />
                  {product.reviews.length === 0 ? (
                    <Message variant="info">没有评论</Message>
                  ) : (
                    <List style={{ width: '100%' }}>
                      {product.reviews.map(review => (
                        <div key={review._id}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={review.name} src={review.image} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <div className={classes.ratingRoot}>
                                  {review.name} -{' '}
                                  {review.role === 'admin'
                                    ? '管理员'
                                    : review.role === 'publisher'
                                    ? '商家'
                                    : '用户'}
                                  <Rating
                                    value={review.rating}
                                    name="review-rating"
                                    disabled
                                  />
                                </div>
                              }
                              secondary={
                                <>
                                  <Typography
                                    component="span"
                                    variant="h5"
                                    style={{
                                      display: 'block',
                                      margin: '0rem,0rem,1rem,0rem',
                                    }}
                                    color="textPrimary"
                                  >
                                    {review.comment}
                                  </Typography>

                                  {moment(review.createdAt).format('LLL')}
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      ))}
                    </List>
                  )}
                </Paper>
              </Grid>
              {/* 写评论区 */}
              <Grid className={classes.grid2} item xs={12} sm={12} md={12}>
                <Paper className={classes.comment} elevation={0}>
                  <Typography gutterBottom variant="h5">
                    写一条评论
                  </Typography>
                  <Divider />
                  {errorProductReview ? (
                    <Message variant="error">{errorProductReview}</Message>
                  ) : successProductReview ? (
                    <Message variant="success">评论添加成功</Message>
                  ) : (
                    <></>
                  )}

                  {userInfo ? (
                    <>
                      <Formik
                        initialValues={{
                          rating: 1,
                          comment: '',
                        }}
                        validationSchema={Yup.object().shape({
                          comment: Yup.string()
                            .max(255)
                            .required('评论不能为空'),
                          rating: Yup.number()
                            .max(255)
                            .required('评分不能为空'),
                        })}
                        onSubmit={(data, { resetForm, setSubmitting }) => {
                          setSubmitting(true);
                          const { rating, comment } = data;

                          dispatch(
                            createProductReview(match.params.id, {
                              rating,
                              comment,
                            })
                          );
                          setSubmitting(false);
                          resetForm();
                        }}
                      >
                        {({
                          errors,
                          handleBlur,
                          handleChange,
                          isSubmitting,
                          touched,
                          values,
                        }) => (
                          <Form>
                            <Box>
                              <List>
                                <ListItem button>
                                  <ListItemAvatar>
                                    <Avatar
                                      alt={userInfo.name}
                                      src={userInfo.image}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <div className={classes.ratingRoot}>
                                        <Rating
                                          value={values.rating}
                                          name="comment-rating"
                                          disabled
                                        />
                                        {ratingOption[values.rating - 1].des}
                                      </div>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Box>

                            <TextField
                              variant="outlined"
                              name="rating"
                              select
                              margin="normal"
                              onBlur={handleBlur}
                              label="选择评分"
                              // fullWidth
                              value={values.rating}
                              onChange={handleChange}
                              error={Boolean(touched.rating && errors.rating)}
                              helperText={touched.rating && errors.rating}
                            >
                              {ratingOption.map(option => (
                                <MenuItem
                                  key={option.rating}
                                  value={option.rating}
                                >
                                  {option.rating}颗星 - {option.des}
                                </MenuItem>
                              ))}
                            </TextField>

                            <TextField
                              error={Boolean(touched.comment && errors.comment)}
                              fullWidth
                              helperText={touched.comment && errors.comment}
                              label="评论"
                              margin="normal"
                              placeholder="留下一条友善的评论"
                              name="comment"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.comment}
                              variant="outlined"
                              multiline
                              rows={2}
                              rowsMax={4}
                            />

                            <Box
                              style={{
                                paddingBottom: '2rem',
                                marginTop: '2rem',
                              }}
                            >
                              <Button
                                color="primary"
                                disabled={isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                              >
                                提交评论
                              </Button>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </>
                  ) : (
                    <Message variant="info">
                      请{' '}
                      <Link component={RouterLink} to="/">
                        登录
                      </Link>
                      进行评论
                    </Message>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {loadingRelated ? (
              <SkeletonArticle />
            ) : errorRelated ? (
              <Message varinat="error">{errorRelated}</Message>
            ) : (
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">
                  您可能也会喜欢
                </Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                  {relatedProducts.map(
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
