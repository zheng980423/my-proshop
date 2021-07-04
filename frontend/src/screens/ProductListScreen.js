import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  InputAdornment,
  makeStyles,
  Slide,
  SvgIcon,
  TextField,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';

import { Search as SearchIcon } from 'react-feather';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Edit } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { deleteProduct, createProduct } from '../actions/adminActions';
import { ADMIN_PRODUCT_CREATE_RESET } from '../constants/adminConstants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import Message from '../components/Message';

import AddIcon from '@material-ui/icons/Add';
import PaginationComponent from '../components/Pagination';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  };
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const adminProductDelete = useSelector(state => state.adminProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adminProductDelete;

  const adminProductCreate = useSelector(state => state.adminProductCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = adminProductCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // //pagination state
  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage] = useState(10);
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentItems = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // //更改页
  // const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch({ type: ADMIN_PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.role === 'admin') {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(pageNumber));
    }
  }, [
    dispatch,
    history,
    successCreate,
    createdProduct,
    userInfo,
    successDelete,
    pageNumber,
  ]);

  const deleteHandler = id => {
    dispatch(deleteProduct(id));
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const [clickOne, setClikOne] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  const animation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  return (
    <>
      <Helmet>
        <title>Products | Material Kit</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          paddingBottom: '24px',
        }}
      >
        <Container maxWidth="lg">
          {loadingDelete && <SkeletonArticle />}
          {errorDelete && <Message variant="error">{errorDelete}</Message>}
          {loading || loadingDelete || loadingCreate ? (
            <SkeletonArticle />
          ) : error || errorDelete || errorCreate ? (
            <Message variant="error">
              {errorCreate ? errorCreate : errorDelete ? errorDelete : error}
            </Message>
          ) : (
            <>
              <Box>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    color="primary"
                    onClick={createProductHandler}
                    startIcon={<AddIcon />}
                    variant="contained"
                  >
                    添加产品
                  </Button>
                </Box>
                <Box style={{ marginTop: '3rem' }}>
                  <Card>
                    <CardContent>
                      <Box style={{ maxWidth: 500 }}>
                        <TextField
                          id="back-to-top-anchor"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SvgIcon fontSize="small" color="action">
                                  <SearchIcon />
                                </SvgIcon>
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Search product"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              <Box style={{ paddingTop: '3rem' }}>
                <Grid
                  container
                  spacing={3}
                  component={motion.div}
                  layout
                  variants={animation}
                  initial="hidden"
                  animate="visible"
                >
                  {products.map(product => (
                    <Grid item key={product._id} lg={4} md={6} xs={12}>
                      <Card
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <CardContent>
                          <Box
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              mariginBottom: '0.5rem',

                              // backgroundColor: 'yellow',
                            }}
                          >
                            <CardMedia
                              alt="Product"
                              image={product.image}
                              style={{
                                paddingTop: '56.25%', // 16:9
                                height: '100%',
                                maxWidth: '100%',
                                width: '100%',
                                objectFit: 'cover',
                              }}
                              variant="square"
                            />
                          </Box>
                          <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            align="center"
                            color="textPrimary"
                            variant="body1"
                            noWrap
                          >
                            {product.description}
                          </Typography>
                        </CardContent>
                        <Box style={{ flexGrow: 1 }} />
                        <Divider />
                        <Box style={{ padding: '2rem' }}>
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <Grid
                              item
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Typography
                                color="textSecondary"
                                display="inline"
                                style={{ paddingLeft: '0.5rem' }}
                                variant="body2"
                              >
                                ${product.price}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Typography
                                color="textSecondary"
                                display="inline"
                                style={{ paddingLeft: '0.5rem' }}
                                variant="body2"
                              >
                                {product.brand}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <Grid
                              item
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to={`/admin/product/${product._id}/edit`}
                                startIcon={<Edit />}
                                // onClick={() => {
                                //   deleteHandler(customer._id);
                                // }}
                                // onClick={handleClickOpen}
                              >
                                编辑
                              </Button>
                            </Grid>
                            <Grid
                              item
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  handleClickOpen();
                                  setClikOne(product);
                                }}
                                startIcon={<DeleteForeverIcon />}
                                // onClick={handleClickOpen}
                              >
                                删除
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2rem',
                }}
              >
                <PaginationComponent pages={pages} page={page} isAdmin={true} />
              </Box>
            </>
          )}
        </Container>
      </Box>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Modal
        product={clickOne}
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
};
function Modal({ open, handleClose, product, deleteHandler }) {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Register
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`该操作将会清空商品${product.name}数据且不可逆，请谨慎考虑`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteHandler(product._id);
            }}
            variant="outlined"
            color="secondary"
          >
            删除
          </Button>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ProductListScreen;
