import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetail } from '../actions/adminActions';
import { updateProduct } from '../actions/adminActions';
import { ADMIN_PRODUCT_UPDATE_RESET } from '../constants/adminConstants';
import Message from '../components/Message';

import SkeletonArticle from '../skeletons/SkeletonArticle';

const useStyles = makeStyles(theme => ({
  media: {
    paddingTop: '56.25%', // 16:9
    height: '200px',
    maxWidth: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  input: {
    display: 'none',
  },
}));
const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;
  const classes = useStyles();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  // const [uploading, setUploading] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const adminProductDetails = useSelector(state => state.adminProductDetails);
  const { loading, error, product } = adminProductDetails;

  const adminProductUpdate = useSelector(state => state.adminProductUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminProductUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET });
      history.push('/admin/products');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetail(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(file);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, successUpdate, product, history, file]);
  // const uploadFileHandler = async e => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     };

  //     const { data } = await axios.post('/api/upload', formData, config);

  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const submitHandler = async e => {
    e.preventDefault();
    // // UPDATE PRODUCT
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      product.image = fileName;
      console.log(product);
      try {
        await axios.post('/api/upload', data);
      } catch (err) {}
    }

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          paddingBottom: '3rem',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <>
                {loading || loadingUpdate ? (
                  <SkeletonArticle />
                ) : error || errorUpdate ? (
                  <Message variant="error">
                    {errorUpdate ? errorUpdate : error ? error : error}
                  </Message>
                ) : (
                  <>
                    <form
                      autoComplete="off"
                      onSubmit={submitHandler}
                      noValidate
                    >
                      <Card>
                        <CardHeader
                          subheader="可以更改下列信息"
                          title="个人资料"
                        />
                        <Divider />
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                helperText="名称不能为空"
                                label="名称"
                                name="name"
                                onChange={e => setName(e.target.value)}
                                required
                                value={name}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                helperText="价格不能为空"
                                label="价格"
                                name="price"
                                onChange={e => setPrice(e.target.value)}
                                required
                                value={price}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                onChange={e => {
                                  setFile(e.target.files[0]);
                                  setImage(e.target.files[0]);
                                }}
                                type="file"
                              />
                              <label htmlFor="contained-button-file">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  上传照片
                                </Button>
                              </label>
                              <TextField
                                fullWidth
                                label="图片"
                                name="image"
                                onChange={e => {
                                  setFile(e.target.files[0]);
                                  setImage(e.target.files[0]);
                                  console.log(e.target.files[0]);
                                  console.log(image);
                                }}
                                required
                                value={file}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label="品牌"
                                name="brand"
                                onChange={e => setBrand(e.target.value)}
                                required
                                value={brand}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label="库存"
                                name="countInStock"
                                onChange={e => setCountInStock(e.target.value)}
                                required
                                value={countInStock}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label="类别"
                                name="category"
                                onChange={e => setCategory(e.target.value)}
                                required
                                value={category}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                fullWidth
                                label="描述"
                                name="description"
                                onChange={e => setDescription(e.target.value)}
                                required
                                value={description}
                                variant="outlined"
                                multiline
                                rows={2}
                                rowsMax={4}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: '32px',
                          }}
                        >
                          <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                          >
                            更新
                          </Button>
                        </Box>
                      </Card>
                    </form>
                  </>
                )}
              </>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ProductEditScreen;
