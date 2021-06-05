import React from 'react';
import SearchRounded from '@material-ui/icons/SearchRounded';

import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      background: '#eef3f6',
      borderRadius: '8px',
      paddingLeft: '16px',
      color: '#b3c5cd',
      margin: '3rem  0',
    },
    input: {
      border: 'none',
      background: 'transparent',
      padding: '1rem',
      fontSize: '24px',
      width: '100%',
      height: '100%',
      outline: 'none',
      '&::placeholder': {
        color: '#b3c5cd',
      },
    },
  };
});
const SearchBox = ({ ...res }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <SearchRounded color="inherit" />
      <input
        className={classes.input}
        placeholder="搜索商品、类别、品牌..."
        {...res}
      />
    </div>
  );
};

export default SearchBox;
