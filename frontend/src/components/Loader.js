import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
const Loader = () => {
  return (
    <CircularProgress
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">加载中</span>
    </CircularProgress>
  );
};
export default Loader;
