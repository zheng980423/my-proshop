import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail, updateUser } from '../actions/adminActions';
import { ADMIN_USER_UPDATE_RESET } from '../constants/adminConstants';
import Message from '../components/Message';

import SkeletonArticle from '../skeletons/SkeletonArticle';

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const adminUserDetail = useSelector(state => state.adminUserDetail);
  const { loading, error, user } = adminUserDetail;

  const adminUserUpdate = useSelector(state => state.adminUserUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUserUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetail(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [user, dispatch, userId, successUpdate, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email }));
  };

  return (
    <>
      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          paddingBottom: '3rem',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <>
                {errorUpdate && (
                  <Message variant="error">{errorUpdate}</Message>
                )}
                {loading || loadingUpdate ? (
                  <SkeletonArticle />
                ) : error ? (
                  <Message variant="error">{error}</Message>
                ) : (
                  <>
                    <form
                      autoComplete="off"
                      onSubmit={submitHandler}
                      noValidate
                    >
                      <Card>
                        <CardHeader
                          subheader="可以更改下列信息"
                          title="个人资料"
                        />
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
                          <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                          >
                            更新
                          </Button>
                        </Box>
                      </Card>
                    </form>
                  </>
                )}
              </>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserEditScreen;
