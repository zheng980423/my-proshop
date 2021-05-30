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
import { getUserDetails } from '../actions/userActions';
import Message from '../components/Message';

import SkeletonArticle from '../skeletons/SkeletonArticle';

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userId, user]);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <>
                {loading ? (
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
