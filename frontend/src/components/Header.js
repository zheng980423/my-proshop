import {
  AppBar,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Logo from './Logo';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { withStyles } from '@material-ui/styles';
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
const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    // border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const handleAdminClick = event => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAdminAnchorEl(null);
  };
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const logoutHandler = () => {
    setAnchorEl(null);
    setAdminAnchorEl(null);
    setOpen(false);
    dispatch(logout());
  };
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <header>
      <HideOnScroll>
        <AppBar className={classes.appbar} elevation={1}>
          <Container maxWidth="lg" fixed>
            <Toolbar className={classes.toolbar}>
              <Typography className={classes.date}>
                <Link color="inherit" component={RouterLink} to="/">
                  <Logo />
                </Link>
              </Typography>

              <Typography>
                <IconButton color="inherit" component={RouterLink} to="/cart">
                  <StyledBadge
                    badgeContent={cartItems.length}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
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
                      to="/myorders"
                      onClick={handleClose}
                    >
                      我的订单
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleClickOpen();
                      }}
                    >
                      登出
                    </MenuItem>
                  </Menu>
                  <Modal
                    open={open}
                    handleModalClose={handleModalClose}
                    logoutHandler={logoutHandler}
                  />
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
              {userInfo && userInfo.role === 'admin' && (
                <>
                  <Button style={{ color: 'white' }} onClick={handleAdminClick}>
                    欢迎，管理员
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={adminAnchorEl}
                    keepMounted
                    open={Boolean(adminAnchorEl)}
                    onClose={handleAdminClose}
                  >
                    <MenuItem
                      component={RouterLink}
                      to="/admin/users"
                      onClick={handleAdminClose}
                    >
                      用户列表
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/admin/products"
                      onClick={handleAdminClose}
                    >
                      商品列表
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/admin/orders"
                      onClick={handleAdminClose}
                    >
                      订单列表
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </header>
  );
};
function Modal({ open, handleModalClose, logoutHandler }) {
  return (
    <>
      <Dialog
        onClose={handleModalClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleModalClose}>
          注销
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {'确定注销吗？'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logoutHandler} variant="contained" color="primary">
            确认
          </Button>
          <Button onClick={handleModalClose} color="secondary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
