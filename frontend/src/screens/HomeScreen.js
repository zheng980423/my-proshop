import {
  Typography,
  makeStyles,
  Box,
  useScrollTrigger,
  Zoom,
  Fab,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Masonry from 'react-masonry-css';
import Product from '../components/Product';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import SearchBox from '../components/SearchBox';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PaginationComponent from '../components/Pagination';
import ProductCarousel from './ProductCarousel';
import HeroSection from '../components/HeroSection';
const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  };
});

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, allProducts, products, page, pages } = productList;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [keyword, setKeyword] = useState('');

  const filteredProducts = allProducts.filter(
    product =>
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword)
  );

  const onInputChange = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber, userInfo]);

  const classes = useStyles();
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <>
      {loading ? (
        <Typography variant="h2" component="h1" className={classes.title}>
          {[1, 2, 3, 4, 5].map(n => (
            <SkeletonArticle key={n}></SkeletonArticle>
          ))}
        </Typography>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          {!keyword && <HeroSection userInfo={userInfo} />}

          <div id="back-to-top-anchor"></div>
          {!keyword && <ProductCarousel />}

          <SearchBox onChange={onInputChange} />
          <Typography variant="h5" component="h1" className={classes.title}>
            商品上新
          </Typography>

          {/* //masonry-css */}
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            id="scroll-to-main-product"
          >
            {keyword
              ? filteredProducts.map(product => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))
              : products.map(product => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
          </Masonry>
          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <PaginationComponent
              style={{ width: '100%' }}
              pages={pages}
              page={page}
            />
          </Box>
          <ScrollTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </>
      )}
    </>
  );
};

export default HomeScreen;
