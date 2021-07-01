import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  Chip,
} from '@material-ui/core';

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
import { listOrders } from '../actions/adminActions';
import { Search as SearchIcon } from 'react-feather';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const adminOrderList = useSelector(state => state.adminOrderList);
  const { loading, error, orders } = adminOrderList;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = orders.map(user => user.id);
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
                                    selectedCustomerIds.length === orders.length
                                  }
                                  color="primary"
                                  indeterminate={
                                    selectedCustomerIds.length > 0 &&
                                    selectedCustomerIds.length < orders.length
                                  }
                                  onChange={handleSelectAll}
                                />
                              </TableCell>
                              <TableCell>ID</TableCell>
                              <TableCell>用户</TableCell>
                              <TableCell>创建日期</TableCell>
                              <TableCell>总计</TableCell>
                              <TableCell>是否支付</TableCell>
                              <TableCell>是否发货</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orders.slice(0, limit).map(order => (
                              <TableRow
                                hover
                                key={order._id}
                                selected={
                                  selectedCustomerIds.indexOf(order._id) !== -1
                                }
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={
                                      selectedCustomerIds.indexOf(order._id) !==
                                      -1
                                    }
                                    onChange={event =>
                                      handleSelectOne(event, order._id)
                                    }
                                    value="true"
                                  />
                                </TableCell>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>
                                  <Box
                                    style={{
                                      alignItems: 'center',
                                      display: 'flex',
                                    }}
                                  >
                                    <Avatar
                                      src={order.user.image && order.user.image}
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
                                      {order.user.name && order.user.name}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {moment(order.createdAt).format('YYYY/MM/DD')}
                                </TableCell>
                                <TableCell> ${order.totalPrice}</TableCell>
                                <TableCell>
                                  <Chip
                                    color={
                                      order.paidAt ? 'primary' : 'secondary'
                                    }
                                    label={order.paidAt ? '已支付' : '未支付'}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    color={
                                      order.deliveredAt
                                        ? 'primary'
                                        : 'secondary'
                                    }
                                    label={
                                      order.deliveredAt ? '已发货' : '未发货'
                                    }
                                    size="small"
                                  />
                                </TableCell>

                                <TableCell>
                                  <Link
                                    component={RouterLink}
                                    to={`/order/${order._id}`}
                                  >
                                    <Button variant="contained" color="primary">
                                      详细信息
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={orders.length}
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

export default OrderListScreen;
