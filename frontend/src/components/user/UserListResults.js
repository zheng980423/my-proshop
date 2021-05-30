import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Link,
} from '@material-ui/core';

import { Edit } from 'react-feather';

const UserListResults = ({ users, ...rest }) => {
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
  const handleDelete = () => {};
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === users.length}
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
                    selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCustomerIds.indexOf(customer._id) !== -1
                        }
                        onChange={event => handleSelectOne(event, customer._id)}
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
                      {moment(customer.createdAt).format('DD/MM/YYYY')}
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
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserListResults;
