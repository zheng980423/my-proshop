import {
  Button,
  TextField,
  Typography,
  Link,
  Box,
  Container,
  Checkbox,
  FormHelperText,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import { register } from '../actions/userActions';
import { Link as RouterLink } from 'react-router-dom';
const RegisterScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {error && <Message variant="error">{error}</Message>}
      {loading && <SkeletonArticle />}
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            policy: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('邮箱的格式必须正确')
              .max(255)
              .required('邮箱不能为空'),
            name: Yup.string().max(255).required('姓名不能为空'),
            password: Yup.string().max(255).required('密码不能为空'),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref('password'), null],
              '密码不匹配'
            ),
            policy: Yup.boolean().oneOf([true], '注册请同意以下条款'),
          })}
          onSubmit={(data, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const { name, email, password } = data;
            dispatch(register(name, email, password));
            setSubmitting(false);
            resetForm();
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            touched,
            values,
          }) => (
            <Form>
              <Box style={{ marginBottom: '3rem' }}>
                <Typography color="textPrimary" variant="h2">
                  注册
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  使用您的邮箱创造新账户
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="姓名"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="邮箱地址"
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
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                fullWidth
                helperText={touched.confirmPassword && errors.confirmPassword}
                label="确认密码"
                margin="normal"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirmPassword}
                variant="outlined"
              />
              <Box
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  marginLeft: '-1rem',
                }}
              >
                <Checkbox
                  checked={values.policy}
                  name="policy"
                  onChange={handleChange}
                />
                <Typography color="textSecondary" variant="body1">
                  我已阅读{' '}
                  <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="h6"
                  >
                    服务条款与条例
                  </Link>
                </Typography>
              </Box>
              {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>{errors.policy}</FormHelperText>
              )}
              <Box style={{ paddingBottom: '2rem' }}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  立即注册
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                已经有账户了？{' '}
                <Link component={RouterLink} to="/login" variant="h6">
                  登录
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default RegisterScreen;
