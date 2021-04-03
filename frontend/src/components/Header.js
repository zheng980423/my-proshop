import {
  AppBar,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    date: { flexGrow: 1, textDecoration: 'none' },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    link: { color: '#fff', padding: theme.spacing(1) },
  };
});

const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.appbar} elevation={1}>
        <Container maxWidth="md">
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.date}>
              <Link color="inherit" component={RouterLink} to="/">
                Proshop
              </Link>
            </Typography>
            <Typography>
              <Button
                color="inherit"
                component={RouterLink}
                to="/cart"
                startIcon={<ShoppingCartIcon />}
              >
                Cart
              </Button>
            </Typography>
            <Typography>
              <Button
                className={classes.link}
                color="inherit"
                component={RouterLink}
                to="/login"
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
