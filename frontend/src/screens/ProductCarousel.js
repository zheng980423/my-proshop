import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
// Components
import Slider from '../components/Slider';
import CharacterCard from '../components/CharacterCard';

const SliderProps = {
  zoomFactor: 30, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 5,
  pageTransition: 500, // Transition when flipping pages
};

// Types

const ProductCarousel = () => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState({});

  const handleDialogOpen = character => {
    setIsDialogOpen(true);
    setActiveCharacter(character);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await (
        await fetch('https://finalspaceapi.com/api/v0/character/')
      ).json();
      setData(data);
    };

    getData();
  }, []);

  console.log(data);

  if (data.length < 1) return <div>Loading ...</div>;

  return (
    <>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <CharacterCard character={activeCharacter} />
      </Dialog>

      <Slider {...SliderProps}>
        {data.map(character => (
          <div key={character.id} onClick={() => handleDialogOpen(character)}>
            <img src={character.img_url} alt="character" />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ProductCarousel;
