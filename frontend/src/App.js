import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
    <Router>
      <Header />
      <div className={classes.toolbar}></div>
      <main className={classes.main}>
        <Container maxWidth="md">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
