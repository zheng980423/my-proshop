import { Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import Product from '../components/Product';
import products from '../products';
const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
  };
});

const HomeScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" component="h1" className={classes.title}>
        Latest Products
      </Typography>
      <Grid container alignItems="stretch" spacing={6}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
