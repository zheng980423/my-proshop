import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import products from '../products';

const useStyles = makeStyles(theme => ({
  // root: {
  //   maxWidth: 345,
  // },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const ProductScreen = ({ match }) => {
  const classes = useStyles();
  const product = products.find(product => product._id === match.params.id);

  return (
    <>
      <Button
        color="inherit"
        style={{ marginBottom: '1.5rem' }}
        component={RouterLink}
        to="/"
      >
        Go Back
      </Button>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductScreen;
