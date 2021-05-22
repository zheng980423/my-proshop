import {
  AppBar,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
    toolbar: { padding: 0 },
    date: { flexGrow: 1, textDecoration: 'none' },
  };
});

const Header = () => {
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
            <Typography>
              <IconButton
                className={classes.link}
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                <AccountCircleIcon />
              </IconButton>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
