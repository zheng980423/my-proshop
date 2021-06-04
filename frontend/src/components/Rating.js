import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { makeStyles } from '@material-ui/core';
import { yellow, grey } from '@material-ui/core/colors';
const useStyles = makeStyles(theme => ({
  group: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: grey[500],
    paddingLeft: theme.spacing(1),
  },
}));
const Rating = ({ value, text, color }) => {
  const classes = useStyles();

  return (
    <div className={classes.group}>
      {value >= 1 ? (
        <StarIcon style={{ color }} />
      ) : value >= 0.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarOutlineIcon style={{ color }} />
      )}

      {value >= 2 ? (
        <StarIcon style={{ color }} />
      ) : value >= 1.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarOutlineIcon style={{ color }} />
      )}

      {value >= 3 ? (
        <StarIcon style={{ color }} />
      ) : value >= 2.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarOutlineIcon style={{ color }} />
      )}

      {value >= 4 ? (
        <StarIcon style={{ color }} />
      ) : value >= 3.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarOutlineIcon style={{ color }} />
      )}

      {value >= 5 ? (
        <StarIcon style={{ color }} />
      ) : value >= 4.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarOutlineIcon style={{ color }} />
      )}

      <span className={classes.text}> {text && text}</span>
    </div>
  );
};
Rating.defaultProps = {
  color: yellow[700],
};
export default Rating;
