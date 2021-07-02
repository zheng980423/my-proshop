import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom';

import {
  Avatar,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Link,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from '@material-ui/core';

import { Edit } from 'react-feather';

import {
  Box,
  Button,
  CardContent,
  Container,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/adminActions';
import { Search as SearchIcon } from 'react-feather';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    if (!userInfo || !userInfo.role === 'admin') {
      history.push('/login');
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, history, userInfo, successDelete]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map(user => user.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const deleteHandler = id => {
    dispatch(deleteUser(id));
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [clickOne, setClikenOne] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <Box
          style={{
            backgroundColor: 'background.default',
            // minHeight: '100%',
            paddingBottom: '3rem',
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
                    <Button
                      startIcon={<AddIcon />}
                      color="primary"
                      variant="contained"
                    >
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
                  <Card>
                    <PerfectScrollbar>
                      <Box sx={{ minWidth: 1050 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={
                                    selectedCustomerIds.length === users.length
                                  }
                                  color="primary"
                                  indeterminate={
                                    selectedCustomerIds.length > 0 &&
                                    selectedCustomerIds.length < users.length
                                  }
                                  onChange={handleSelectAll}
                                />
                              </TableCell>
                              <TableCell>姓名</TableCell>
                              <TableCell>邮箱</TableCell>
                              <TableCell>权限</TableCell>
                              <TableCell>注册日期</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users
                              .filter(user => user.role !== 'admin')
                              .slice(0, limit)
                              .map(customer => (
                                <TableRow
                                  hover
                                  key={customer._id}
                                  selected={
                                    selectedCustomerIds.indexOf(
                                      customer._id
                                    ) !== -1
                                  }
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={
                                        selectedCustomerIds.indexOf(
                                          customer._id
                                        ) !== -1
                                      }
                                      onChange={event =>
                                        handleSelectOne(event, customer._id)
                                      }
                                      value="true"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Box
                                      style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                      }}
                                    >
                                      <Avatar
                                        src={customer.image}
                                        style={{
                                          marginRight: '2rem',
                                          display: 'inline-block',
                                        }}
                                      ></Avatar>
                                      <Typography
                                        color="textPrimary"
                                        style={{ display: 'inline' }}
                                        variant="body1"
                                      >
                                        {customer.name}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>{customer.email}</TableCell>

                                  <TableCell>
                                    {customer.role === 'publisher'
                                      ? '商家'
                                      : customer.role === 'user'
                                      ? '用户'
                                      : customer.role === 'admin'
                                      ? '管理员'
                                      : ''}
                                  </TableCell>
                                  <TableCell>
                                    {moment(customer.createdAt).format(
                                      'DD/MM/YYYY'
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Link
                                      component={RouterLink}
                                      to={`/admin/user/${customer._id}/edit`}
                                    >
                                      <IconButton color="primary">
                                        <Edit />
                                      </IconButton>
                                    </Link>
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      edge="end"
                                      aria-label="delete"
                                      onClick={() => {
                                        handleClickOpen();
                                        setClikenOne(customer);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>

                                  <Modal
                                    customer={clickOne}
                                    open={open}
                                    handleClose={handleClose}
                                    deleteHandler={deleteHandler}
                                  />
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={users.length}
                      onChangePage={handlePageChange}
                      onChangeRowsPerPage={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>
                </Box>
              </>
            )}
          </Container>
        </Box>
      </>
    </>
  );
};
function Modal({ open, handleClose, customer, deleteHandler }) {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          删除用户
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`该操作将会清空用户${customer.name}数据且不可逆，请谨慎考虑`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteHandler(customer._id);
            }}
            variant="outlined"
            color="secondary"
          >
            删除
          </Button>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default UserListScreen;
