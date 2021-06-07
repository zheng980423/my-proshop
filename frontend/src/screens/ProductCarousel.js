import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';
import { listTopProducts } from '../actions/productActions';
import SkeletonArticle from '../skeletons/SkeletonArticle';
// Components
import Slider from '../components/Slider';

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 2, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition when flipping pages
};

// Types

const ProductCarousel = () => {
  // const [data, setData] = useState([]);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [activeCharacter, setActiveCharacter] = useState({});

  //setTopRatedItems
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  // const handleDialogOpen = character => {
  //   setIsDialogOpen(true);
  //   setActiveCharacter(character);
  // };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <SkeletonArticle />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <>
      {/* <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <CharacterCard character={activeCharacter} />
      </Dialog> */}

      <Slider {...SliderProps}>
        {products.map(product => (
          <div
            key={product._id}
            // onClick={() => handleDialogOpen(product)}
          >
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt="character" />
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ProductCarousel;
