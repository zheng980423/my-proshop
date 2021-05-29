import moment from 'moment';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Message from '../components/Message';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import { listMyOrders } from '../actions/orderActions';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';

const MyOrders = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading, error, orders: myOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);
  return loading ? (
    <SkeletonArticle />
  ) : error ? (
    <Message>{error}</Message>
  ) : myOrders.length === 0 ? (
    <Message variant="info">
      阿偶，您的订单是空的{' '}
      <Link style={{ color: 'black' }} to="/" component={RouterLink}>
        返回购物
      </Link>
    </Message>
  ) : (
    <Card>
      <CardHeader title="我的订单" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>订单ID</TableCell>
                {/* <TableCell>Customer</TableCell> */}
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      创建日期
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>总计</TableCell>
                <TableCell>是否支付</TableCell>
                <TableCell>是否发货</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders.map(order => (
                <TableRow hover key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  {/* <TableCell>{order.customer.name}</TableCell> */}
                  <TableCell>
                    {moment(order.createdAt).format('YYYY/MM/DD')}
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    <Chip
                      color={order.isPaid ? 'primary' : 'secondary'}
                      label={order.isPaid ? '已支付' : '尚未支付'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={order.isDelivered ? 'primary' : 'secondary'}
                      label={order.isDelivered ? '已发货' : '尚未发货'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/order/${order._id}`}>
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
      {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
    </Card>
  );
};

export default MyOrders;
