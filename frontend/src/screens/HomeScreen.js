import { Typography } from '@material-ui/core';
import React from 'react';
import Product from '../components/Product';
import products from '../products';

const HomeScreen = () => {
  return (
    <>
      <Typography variant="h5" component="h1">
        Latest Products
      </Typography>
      {products.map(product => (
        <Product key={product._id} product={product} />
      ))}
    </>
  );
};

export default HomeScreen;
