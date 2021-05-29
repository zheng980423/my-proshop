import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import { Container } from '@material-ui/core';
const useStyles = makeStyles(theme => {
  return {
    toolbar: theme.mixins.toolbar,
    main: { padding: theme.spacing(3) },
  };
});

const MainLayout = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.toolbar}></div>
      <main className={classes.main}>
        <Container maxWidth="lg" fixed>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
