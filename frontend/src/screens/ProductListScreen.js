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
  Grid,
  InputAdornment,
  Slide,
  SvgIcon,
  TextField,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Search as SearchIcon } from 'react-feather';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Edit } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { deleteProduct } from '../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import Message from '../components/Message';
import AddIcon from '@material-ui/icons/Add';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const adminProductDelete = useSelector(state => state.adminProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adminProductDelete;

  // const productCreate = useSelector(state => state.productCreate);
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   product: createdProduct,
  // } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

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

  const createProductHandler = () => {};

  return (
    <>
      <Helmet>
        <title>Products | Material Kit</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          paddingBottom: '3rem',
        }}
      >
        <Container maxWidth="lg">
          {loadingDelete && <SkeletonArticle />}
          {errorDelete && <Message variant="error">{errorDelete}</Message>}
          {loading ? (
            <SkeletonArticle />
          ) : error ? (
            <Message variant="error">{error}</Message>
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
                <Grid container spacing={3}>
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
                            {/* <Dialog
                              open={open}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-slide-title"
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle id="alert-dialog-slide-title">
                                {`确定要删除${product.name}吗？`}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                  该操作将会清空用户数据且不可逆，请谨慎考虑
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
                            </Dialog> */}
                          </Grid>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '3rem',
                }}
              >
                <Pagination color="primary" count={3} size="small" />
              </Box>
            </>
          )}
        </Container>
      </Box>

      <Modal
        customer={clickOne}
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
      />
    </>
  );
};
function Modal({ open, handleClose, customer, deleteHandler }) {
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
            {`该操作将会清空商品${customer.name}数据且不可逆，请谨慎考虑`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteHandler(customer._id);
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