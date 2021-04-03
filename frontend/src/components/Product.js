import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from '@material-ui/core';
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import Rating from './Rating';
import React from 'react';
const useStyles = makeStyles({
  avatar: {
    backgroundColor: note => {
      if (note.category === 'Electronics') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return pink[500];
      }

      return blue[500];
    },
  },
  cardcontent: {
    paddingBottom: 0,
  },
  productImg: {
    objectFit: 'cover',
  },
});
const Product = ({ product }) => {
  const classes = useStyles(product);
  return (
    <>
      <Card elevation={1} className={classes.root}>
        <CardActionArea href={`/product/${product._id}`}>
          <CardMedia
            className={classes.productImg}
            component="img"
            alt="Contemplative Reptile"
            image={product.image}
            title={product.name}
          />
        </CardActionArea>
        <CardContent className={classes.cardcontent}>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Typography>
          <Typography variant="h4" component="h2">
            <small>￥</small>
            {product.price}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" href={`/product/${product._id}`}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
