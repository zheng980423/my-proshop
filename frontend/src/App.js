import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
const useStyles = makeStyles(theme => {
  return {
    toolbar: theme.mixins.toolbar,
    main: { padding: theme.spacing(3) },
  };
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.toolbar}></div>
      <main className={classes.main}>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
