import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { resetPassword } from '../actions/userActions';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      position: 'relative',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '300px',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      '&>*': { padding: '0.5rem 0' },
    },
    exit: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      fontSize: '1rem',
      '&:hover': {
        cursor: 'pointer',
      },
      padding: 0,
    },
    des: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.5rem 0',
    },
    h2: { margin: '0.5rem' },
    text: {
      margin: '0 0 0.5rem 0',
      textAlign: 'center',
    },
    input: { width: '100%' },
    btn: { width: '100%' },
  };
});
const ResetPasswordScreen = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userResetPassword = useSelector(state => state.userResetPassword);

  const { loading, error, success } = userResetPassword;
  return (
    <>
      {loading ? (
        <SkeletonArticle />
      ) : (
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string().max(255).required('密码不能为空'),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref('password'), null],
              '密码不匹配'
            ),
          })}
          onSubmit={(data, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const { password } = data;
            dispatch(resetPassword(match.params.resettoken, password));
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
              <div className={classes.wrapper}>
                <div className={classes.exit}>
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21"
                      cy="21"
                      r="20"
                      fill="white"
                      stroke="#EDEEF7"
                      strokeWidth="2"
                    />
                    <path
                      d="M26.3334 15.6667L15.6667 26.3334"
                      stroke="#151936"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.6667 15.6667L26.3334 26.3334"
                      stroke="#151936"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={classes.des}>
                  <h2 className={classes.h2}>修改密码</h2>
                  <p className={classes.text}>请记住您修改的密码哦！</p>
                </div>

                <div className={classes.errorsuccess}>
                  {error && <Message variant="error">{error}</Message>}
                </div>
                {success ? (
                  <>
                    <div className={classes.errorsuccess}>
                      <Message variant="success">
                        修改成功,点击进入登录页面
                      </Message>
                    </div>
                    <div className={classes.btn}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        component={RouterLink}
                        to="/login"
                        variant="contained"
                      >
                        登录
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={classes.input}>
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
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        label="确认密码"
                        margin="normal"
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.confirmPassword}
                        variant="outlined"
                      />
                    </div>

                    <div className={classes.btn}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        {isSubmitting ? '修改密码中...' : '修改密码'}
                      </Button>
                    </div>

                    <div className="back">
                      <Typography color="textSecondary" variant="body1">
                        想起密码了？
                        <Link component={RouterLink} to="/login" variant="h6">
                          登录
                        </Link>
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ResetPasswordScreen;
