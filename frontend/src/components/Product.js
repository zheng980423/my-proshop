import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import React from 'react';
const useStyles = makeStyles({
  test: {
    border: note => {
      if (note.category === 'work') return '1px solid red';
    },
  },
  avatar: {
    backgroundColor: note => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return pink[500];
      }

      return blue[500];
    },
  },
});
const Product = ({ product }) => {
  const classes = useStyles(product);
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{product._id}</Avatar>}
          action={
            <IconButton
            // onClick={() => {
            //   handleDelete(product.id);
            // }}
            >
              <DeleteOutlined />
            </IconButton>
          }
          title={product.name}
          subheader={product.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
