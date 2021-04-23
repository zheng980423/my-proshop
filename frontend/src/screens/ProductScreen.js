import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Grow,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating';

import products from '../products';

const useStyles = makeStyles(theme => ({
  // root: {
  //   display: 'flex',
  // },
  media: {
    paddingTop: '56.25%', // 16:9

    objectFit: 'cover',
  },
  // grid: {
  //   borderRight: '1px solid #eee',
  // },
  margin: {
    margin: theme.spacing(2),
    // margin: theme.spacing(1),
  },
  paper: { padding: theme.spacing(2) },
}));

const ProductScreen = ({ match }) => {
  const classes = useStyles();
  const product = products.find(product => product._id === match.params.id);

  return (
    <>
      <Button
        className={classes.margin}
        style={{ marginBottom: '1.5rem' }}
        component={RouterLink}
        to="/"
      >
        Go Back
      </Button>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={12} md={7}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={product.image}
                  title={product.name}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper className={classes.paper} elevation={1}>
                <Typography variant="h5" component="h1">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <List component="nav" aria-label="mailbox folders">
                  <ListItem>
                    <ListItemText primary={`$${product.price}`} />
                  </ListItem>
                  <Divider light />
                  <ListItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListItem>
                  <Divider light />
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default ProductScreen;
