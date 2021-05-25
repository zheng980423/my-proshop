import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
const drawWidth = 240;
const useStyles = makeStyles(theme => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawWidth,
    },
    drawerPaper: {
      width: drawWidth,
    },
    root: { display: 'flex' },
    active: { background: '#f4f4f4' },
    title: {
      padding: theme.spacing(3),
    },
    toolbar: { padding: 0 },
    date: { flexGrow: 1, textDecoration: 'none' },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  };
});

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(logout());
  };
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.appbar} elevation={1}>
        <Container maxWidth="lg" fixed>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.date}>
              <Link color="inherit" component={RouterLink} to="/">
                Proshop
              </Link>
            </Typography>
            <Typography>
              <IconButton color="inherit" component={RouterLink} to="/cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Typography>

            {userInfo ? (
              //menu avatar
              <>
                <Button style={{ color: 'white' }} onClick={handleClick}>
                  <Avatar
                    className={classes.small}
                    src={userInfo.image}
                    onClick={handleClick}
                  ></Avatar>
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleClose}
                  >
                    个人资料
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/account"
                    onClick={handleClose}
                  >
                    我的账户
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>登出</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                className={classes.link}
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                <AccountCircleIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
