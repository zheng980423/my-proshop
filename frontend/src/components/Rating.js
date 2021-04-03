import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { makeStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
const useStyles = makeStyles({
  rating: {
    alignItems: 'center',
  },
});
const Rating = ({ value, text, color }) => {
  const classes = useStyles();
  return (
    <div className={classes.rating}>
      <span>
        {value >= 1 ? (
          <StarIcon style={{ color }} />
        ) : value >= 0.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarOutlineIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarIcon style={{ color }} />
        ) : value >= 1.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarOutlineIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarIcon style={{ color }} />
        ) : value >= 2.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarOutlineIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarIcon style={{ color }} />
        ) : value >= 3.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarOutlineIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarIcon style={{ color }} />
        ) : value >= 4.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarOutlineIcon style={{ color }} />
        )}
      </span>
      <br />
      <div>{text && text}</div>
    </div>
  );
};
Rating.defaultProps = {
  color: yellow[700],
};
export default Rating;
