import { Grid, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import SkeletonArticle from '../skeletons/SkeletonArticle';
const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
  };
});

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" component="h1" className={classes.title}>
        Latest Products
      </Typography>
      {loading ? (
        <Typography variant="h2" component="h1" className={classes.title}>
          <SkeletonArticle />
        </Typography>
      ) : error ? (
        <Typography variant="h3" component="h1" className={classes.title}>
          {error}
        </Typography>
      ) : (
        <Grid container alignItems="stretch" spacing={6}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
