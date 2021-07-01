import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import { login } from '../actions/userActions';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ReactComponent as LoginSvg } from '../svgs/login.svg';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';

const Login = ({ location, history }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, dispatch]);
  return (
    <>
      <Helmet>
        <title>登录 | Proshop</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {error && <Message variant="error">{error}</Message>}
        {loading ? (
          <SkeletonArticle />
        ) : (
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('邮箱地址必须合法!')
                  .max(255)
                  .required('邮箱不能为空'),
                password: Yup.string().max(255).required('密码不能为空'),
              })}
              onSubmit={(data, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                const { email, password } = data;
                dispatch(login(email, password));
                setSubmitting(false);
                resetForm();
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box>
                    <Grid container justify="center" align="center" spacing={3}>
                      <Grid item xs={12} md={12}></Grid>
                      <LoginSvg style={{ width: '400px', height: '400px' }} />
                    </Grid>
                  </Box>
                  <Box
                    style={{
                      paddingBottom: '8px',
                      paddingTop: '24px',
                    }}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      使用QQ邮箱登录
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="邮箱地址"
                    placeholder="xxx@qq.com"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="密码"
                    margin="normal"
                    placeholder="密码不得少于6位"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box style={{ paddingBottom: '2rem' }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      立即登录
                    </Button>
                  </Box>
                  <Box
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography color="textSecondary" variant="body1">
                      没创建账户？
                      <Link component={RouterLink} to="/register" variant="h6">
                        注册
                      </Link>
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      忘记密码？
                      <Link
                        component={RouterLink}
                        to="/forgotpassword"
                        variant="h6"
                      >
                        找回密码
                      </Link>
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      paddingBottom: '1rem',
                      paddingTop: '3rem',
                    }}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      或者 使用内置平台登录
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Button
                        color="primary"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Facebook
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Login;
