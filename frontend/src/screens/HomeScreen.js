import { Typography, makeStyles, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Masonry from 'react-masonry-css';
import Product from '../components/Product';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import SearchBox from '../components/SearchBox';
import PaginationComponent from '../components/Pagination';
const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
  };
});

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const [keyword, setKeyword] = useState('');

  const filteredProducts = products.filter(
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
  }, [dispatch, pageNumber]);

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
          <SearchBox onChange={onInputChange} />
          <Typography variant="h5" component="h1" className={classes.title}>
            商品上新
          </Typography>

          {/* //masonry-css */}
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredProducts.map(product => (
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
        </>
      )}
    </>
  );
};

export default HomeScreen;
