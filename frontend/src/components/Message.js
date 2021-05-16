import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = ({ variant, children }) => {
  return <Alert severity={variant}>{children}</Alert>;
};
Message.defaultProps = {
  variant: 'error',
};
export default Message;
