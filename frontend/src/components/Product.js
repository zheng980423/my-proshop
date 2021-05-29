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
import { Link } from 'react-router-dom';
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
    // width: '100%',
    // height: 100,
  },
  root: {},
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
const Product = ({ product }) => {
  const classes = useStyles(product);
  return (
    <>
      <Card elevation={1} className={classes.root}>
        <Link to={`/product/${product._id}`}>
          <CardActionArea>
            <CardMedia
              className={classes.productImg}
              component="img"
              alt="Contemplative Reptile"
              image={product.image}
              title={product.name}
            />
          </CardActionArea>
        </Link>
        <CardContent className={classes.cardcontent}>
          <Typography gutterBottom variant="subtitle1" component="h2" noWrap>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            color="textSecondary"
            component="div"
          >
            <Rating
              value={product.rating}
              text={`共${product.numReviews}条评论`}
            />
          </Typography>
          <Typography variant="h5" component="h2">
            <small>￥</small>
            {product.price}
          </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Link to={`/product/${product._id}`}>
            <Button className={classes.shareBtn} size="small" color="primary">
              了解更多
            </Button>
          </Link>
          <Link to={`/${product._id}`}>
            <Button size="small" color="primary">
              分享
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
