import {
  Button,
  Card,
  CardMedia,
  makeStyles,
  Typography,
  Grow,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';

import { useState, useEffect } from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import Rating from '../components/Rating';
import { red } from '@material-ui/core/colors';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  media: {
    paddingTop: '56.25%', // 16:9
    height: '200px',
    maxWidth: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  description: {
    padding: theme.spacing(2),
  },

  margin: {
    margin: theme.spacing(2),
    marginLeft: '0px',
    // margin: theme.spacing(1),
  },
  price: {
    color: red[500],
    fontSize: '1.5rem',
  },
  container: {
    padding: '0px',
  },
  name: {
    paddingBottom: theme.spacing(2),
  },
  listitem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addtocartbtn: { width: '100%' },

  paper: { padding: theme.spacing(2) },
  grid2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  grid1: {},
}));

const ProductScreen = ({ match }) => {
  const classes = useStyles();

  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match]);
  const [qty, setQty] = useState(1);
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
        <Container className={classes.container}>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.grid}
          >
            <Grid item xs={12} sm={12} md={7}>
              <Card className={classes.mediaCard}>
                <CardMedia
                  className={classes.media}
                  image={product.image}
                  title={product.name}
                />
              </Card>
            </Grid>
            <Grid className={classes.grid2} item xs={12} sm={12} md={5}>
              <Paper className={classes.paper} elevation={0}>
                <div className={classes.description}>
                  <Typography
                    variant="h5"
                    className={classes.name}
                    component="h1"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description}
                  </Typography>
                </div>

                <List component="div" aria-label="mailbox folders">
                  <ListItem>
                    <Typography className={classes.price}>
                      ${product.price}
                    </Typography>
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
              <Paper className={classes.paper}>
                <List
                  component="div"
                  className={classes.root}
                  aria-label="mailbox folders"
                >
                  <ListItem className={classes.listitem} button>
                    <Typography>价格：</Typography>
                    <Typography>${product.price}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem className={classes.listitem} button divider>
                    <Typography>状态:</Typography>
                    <Typography>
                      {product.countInStock > 0 ? '有库存' : '售罄'}
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listitem}>
                    <Typography>数量:</Typography>
                    <FormControl
                      variant="filled"
                      disabled={product.countInStock === 0}
                    >
                      <InputLabel htmlFor="filled-age-native-simple">
                        {product.countInStock > 0 ? '数量' : '0'}
                      </InputLabel>
                      <Select
                        native
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                        inputProps={{
                          name: 'qty',
                          id: 'filled-qty',
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>
                      {product.countInStock > 0 ? (
                        ''
                      ) : (
                        <FormHelperText>已售罄</FormHelperText>
                      )}
                    </FormControl>
                  </ListItem>
                  <Divider light />
                  <ListItem className={classes.listitem}>
                    <Typography style={{ width: '100%' }}>
                      <Button
                        startIcon={<AddShoppingCartIcon />}
                        variant="contained"
                        color="primary"
                        className={classes.addtocartbtn}
                        disabled={product.countInStock === 0}
                      >
                        添加到购物车
                      </Button>
                    </Typography>
                  </ListItem>
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
