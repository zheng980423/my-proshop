import React, { useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import UserListResults from '../components/user/UserListResults';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import Message from '../components/Message';
import { listUsers } from '../actions/adminActions';
import { Search as SearchIcon } from 'react-feather';
const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <DashboardLayout>
      <>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            {loading ? (
              <SkeletonArticle />
            ) : error ? (
              <Message variant="error">{error}</Message>
            ) : (
              <>
                <Box>
                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="primary" variant="contained">
                      添加用户
                    </Button>
                  </Box>
                  <Box style={{ marginTop: '3rem' }}>
                    <Card>
                      <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                          <TextField
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              ),
                            }}
                            placeholder="Search customer"
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
                <Box style={{ paddingTop: '3rem' }}>
                  <UserListResults users={users} />
                </Box>
              </>
            )}
          </Container>
        </Box>
      </>
    </DashboardLayout>
  );
};

export default UserListScreen;
