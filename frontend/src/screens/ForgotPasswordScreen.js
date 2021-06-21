import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { sendFindPasswordEmail } from '../actions/userActions';
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

const ForgotPasswordScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [num, setNum] = useState(60);

  const userForgotPassword = useSelector(state => state.userForgotPassword);

  const { loading, error, success, result } = userForgotPassword;

  useEffect(() => {
    if (success || error) {
      const interval = setInterval(() => {
        if (num > 0) {
          setNum(num => num - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [num, success, error]);

  return (
    <>
      {loading ? (
        <SkeletonArticle />
      ) : (
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('邮箱的格式必须正确')
              .max(255)
              .required('邮箱不能为空'),
          })}
          onSubmit={(data, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const { email } = data;
            dispatch(sendFindPasswordEmail(email));
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
                  <h2 className={classes.h2}>忘记密码了?</h2>
                  <p className={classes.text}>
                    不要担心！找回你的密码是很容易的，只需要在下方输入您在proshop中注册的邮箱即可
                  </p>
                </div>
                <div className={classes.errorsuccess}>
                  {error && <Message variant="error">{error}</Message>}
                  {success && (
                    <Message variant="success">{result.data}</Message>
                  )}
                </div>
                <div className={classes.input}>
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
                </div>

                <div className={classes.btn}>
                  <Button
                    color="primary"
                    disabled={
                      num !== 0 &&
                      (error !== undefined || success !== undefined)
                    }
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting
                      ? '发送邮件中...'
                      : num === 0
                      ? '发送找回密码邮件'
                      : success
                      ? `没收到邮件？请于${num}后重试`
                      : error
                      ? `请于${num}后重试`
                      : '发送找回密码邮件'}
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
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ForgotPasswordScreen;
