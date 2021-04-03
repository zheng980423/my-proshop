import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
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
    appbar: {},
    toolbar: { padding: 0 },
    date: { flexGrow: 1 },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    link: { color: '#fff', padding: theme.spacing(1) },
  };
});

const Header = () => {
  const classes = useStyles();
  const preventDefault = event => event.preventDefault();
  return (
    <header>
      <AppBar className={classes.appbar} elevation={1}>
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.date}>Proshop</Typography>
            <Typography>
              <Button
                href="/cart"
                onClick={preventDefault}
                color="inherit"
                startIcon={<ShoppingCartIcon />}
              >
                Cart
              </Button>
            </Typography>
            <Typography>
              <Button
                className={classes.link}
                href="/login"
                color="inherit"
                onClick={preventDefault}
                startIcon={<AccountCircleIcon />}
              >
                Sign In
              </Button>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
