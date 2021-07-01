import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import SkeletonArticle from '../../skeletons/SkeletonArticle';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const AccountProfileDetails = ({ history }) => {
  const usehis = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success, error: errorUpdate } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setGender(user.gender);
        setBiography(user.biography);
        setLocation(user.location);
      }
    }
    if (success) {
      setTimeout(() => {
        usehis.go(0);
      }, 1500);
    }
  }, [dispatch, history, success, userInfo, user, usehis]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          biography,
          location,
          gender,
          password,
        })
      );
    }
  };

  return (
    <>
      {message && <Message variant="error">{message}</Message>}
      {success ? (
        <Message variant="success">个人信息更新成功</Message>
      ) : errorUpdate ? (
        <Message variant="error">{errorUpdate}</Message>
      ) : (
        <></>
      )}

      {loading ? (
        <SkeletonArticle />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <form autoComplete="off" onSubmit={submitHandler} noValidate>
            <Card>
              <CardHeader subheader="可以更改下列信息" title="个人资料" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="姓名不能为空"
                      label="姓名"
                      name={name}
                      onChange={e => setName(e.target.value)}
                      required
                      value={name}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="邮箱地址"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                      required
                      value={email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="地址"
                      name="location"
                      onChange={e => setLocation(e.target.value)}
                      required
                      value={location}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="性别"
                      name="gender"
                      onChange={e => setGender(e.target.value)}
                      required
                      value={gender}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="个性签名"
                      name="biography"
                      onChange={e => setBiography(e.target.value)}
                      required
                      value={biography}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="密码"
                      name="password"
                      onChange={e => setPassword(e.target.value)}
                      required
                      value={password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="确认密码"
                      name="confirmPassword"
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      value={confirmPassword}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '32px',
                }}
              >
                <Button type="submit" color="primary" variant="contained">
                  更新
                </Button>
              </Box>
            </Card>
          </form>
        </>
      )}
    </>
  );
};

export default AccountProfileDetails;
