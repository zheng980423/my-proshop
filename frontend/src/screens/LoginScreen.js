import {
  Button,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  withStyles,
  Link,
} from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import { login } from '../actions/userActions';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles(theme => {
  return {
    title: {
      padding: ' 0 0 1.5rem 0',
    },
    addtocartbtn: { width: '100%', backgroundColor: grey[900] },
    textfield: {
      width: '100%',
      // marginTop: theme.spacing(4),
      // marginBottom: theme.spacing(4),
    },
    paper: { padding: theme.spacing(4) },
    ortext: { color: grey[500] },
    group1: {
      '& > *': {
        marginTop: theme.spacing(4),
      },
    },
    group2: {
      '& > *': {
        marginTop: theme.spacing(4),
      },
    },
    radio: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    radiogroup: {
      display: 'inline-block',
    },
    login: {
      width: '100%',
    },
  };
});
const LoginScreen = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const addToCartHandler = () => {};
  const handleChange = () => {
    setChecked(!checked);
  };
  const submitHandler = () => {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);
  return (
    <div className="container">
      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <Paper className={classes.paper}>
          <Grid container alignItems="stretch" spacing={6}>
            <Grid className={classes.group1} item xs={12} sm={12} md={6} lg={6}>
              <Typography style={{ width: '100%' }}>
                <Button
                  startIcon={<GitHubIcon />}
                  onClick={addToCartHandler}
                  variant="contained"
                  color="primary"
                  className={classes.addtocartbtn}
                >
                  使用Github登录
                </Button>
              </Typography>
              <Typography
                variant="h5"
                component="h1"
                align="center"
                className={classes.ortext}
              >
                或者
              </Typography>

              <TextField
                id="filled-search"
                label="电子邮箱"
                type="email"
                variant="outlined"
                className={classes.textfield}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                id="filled-search"
                label="密码"
                type="password"
                variant="outlined"
                className={classes.textfield}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <div className={classes.radio}>
                <RadioGroup
                  className={classes.radiogroup}
                  aria-label="quiz"
                  name="quiz"
                  value="c"
                  // onChange={handleChange}
                >
                  <FormControlLabel
                    value="best"
                    control={
                      <GreenRadio checked={checked} onClick={handleChange} />
                    }
                    label="记住我"
                  />
                </RadioGroup>
                <Link
                  color="primary"
                  component={RouterLink}
                  to="/forgotpassword"
                >
                  忘记密码？
                </Link>
              </div>
              <Button
                type="submit"
                onClick={addToCartHandler}
                variant="contained"
                color="primary"
                className={classes.login}
              >
                登录
              </Button>
              <Typography variant="h5" component="h1" align="center">
                还没有账户？
                <Link color="primary" component={RouterLink} to="/signup">
                  注册
                </Link>
              </Typography>
            </Grid>

            <Grid className={classes.group2} item xs={12} sm={6}>
              <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="filled"
                className={classes.textfield}
              />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default LoginScreen;
