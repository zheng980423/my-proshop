import { Helmet } from 'react-helmet';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Search as SearchIcon } from 'react-feather';
import ProductCard from '../components/product/ProductCard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  // const productDelete = useSelector(state => state.productDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = productDelete;

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
  }, [dispatch, history, userInfo]);

  const deleteHandler = id => {};

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
          <Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button color="primary" variant="contained">
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
                <Grid item key={product.id} lg={4} md={6} xs={12}>
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
                          paddingBottom: '3rem',
                        }}
                      >
                        <Avatar
                          alt="Product"
                          src={product.image}
                          variant="square"
                        />
                      </Box>
                      <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        align="center"
                        color="textPrimary"
                        variant="body1"
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
                          <AccessTimeIcon color="action" />
                          <Typography
                            color="textSecondary"
                            display="inline"
                            style={{ paddingLeft: '1rem' }}
                            variant="body2"
                          >
                            Updated 2hr ago
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <GetAppIcon color="action" />
                          <Typography
                            color="textSecondary"
                            display="inline"
                            style={{ paddingLeft: '1rem' }}
                            variant="body2"
                          >
                            {product.totalDownloads} Downloads
                          </Typography>
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
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '3rem',
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductListScreen;
