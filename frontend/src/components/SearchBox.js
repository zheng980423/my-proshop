import React from 'react';
import SearchRounded from '@material-ui/icons/SearchRounded';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  makeStyles,
  withStyles,
  MenuItem,
  Menu,
  Button,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StarsIcon from '@material-ui/icons/Stars';
import FilterListIcon from '@material-ui/icons/FilterList';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    inputWrapper: {
      display: 'flex',
      width: '50%',
      alignItems: 'center',
      background: '#eef3f6',
      borderRadius: '8px',
      paddingLeft: '16px',
      color: '#b3c5cd',
      margin: '3rem  0',
    },
    searchInfo: {
      display: 'flex',
      width: '50%',
      alignItems: 'center',
      // background: '#eef3f6',
      borderRadius: '8px',
      paddingLeft: '16px',
      // color: '#b3c5cd',
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
        fontSize: '1rem',
      },
    },
    btnWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
    },
    btn: {
      marginLeft: '1rem',
    },
  };
});
const SearchBox = ({ clickedCategory, setClickedCategory, ...res }) => {
  const classes = useStyles();
  const productList = useSelector(state => state.productList);
  const { allProducts } = productList;
  const allCategories = () => {
    const categoryArray = [];
    allProducts.map(product => categoryArray.push(product.category));
    return [...new Set(categoryArray)];
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [clickedCategory, setClickedCategory] = React.useState('');
  const clickIngredient = value => {
    setClickedCategory(value);
    setAnchorEl(null);
  };
  const clearCategory = () => {
    setClickedCategory('');
  };

  return (
    <div className={classes.wrapper}>
      {!clickedCategory ? (
        <div className={classes.inputWrapper}>
          <SearchRounded color="inherit" />
          <input
            className={classes.input}
            placeholder="搜索商品、类别、品牌..."
            {...res}
          />
        </div>
      ) : (
        <div className={classes.searchInfo}>
          <Typography variant="h3" noWrap>
            搜索类别 {clickedCategory}的结果：
          </Typography>
        </div>
      )}
      <div className={classes.btnWrapper}>
        {clickedCategory ? (
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            color="secondary"
            onClick={clearCategory}
            className={classes.btn}
            startIcon={<HighlightOffIcon />}
          >
            取消类别筛选
          </Button>
        ) : (
          <></>
        )}

        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={classes.btn}
          startIcon={<FilterListIcon />}
        >
          筛选
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {allCategories().map(category => (
            <StyledMenuItem
              data-value={category}
              onClick={clickIngredient.bind(this, category)}
              // onClick={()=>setClickedCategory(this.category)}

              key={category}
            >
              <ListItemIcon>
                <StarsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={category} />
            </StyledMenuItem>
          ))}
        </StyledMenu>
      </div>
    </div>
  );
};

export default SearchBox;
