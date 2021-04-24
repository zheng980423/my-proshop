import { Grid, Typography, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import axios from 'axios';
const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
  };
});

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
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
