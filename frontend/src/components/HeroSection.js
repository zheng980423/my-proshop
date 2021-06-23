import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 0, 6),
    position: 'relative',
    zIndex: '10',
    height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

const HeroSection = ({ userInfo }) => {
  const classes = useStyles();

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#scroll-to-main-product'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {!userInfo
            ? '您好！欢迎来到Proshop!'
            : userInfo.role === 'admin'
            ? '欢迎，管理员！'
            : '让购物变得简单'}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {!userInfo
            ? '请登录以享受更多服务'
            : userInfo.role === 'admin'
            ? '欢迎使用管理用户，商品，订单等服务'
            : '正品低价、品质保障、配送及时、轻松购物！ 多快好省 只为品质生活‎。'}
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              {!userInfo ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                >
                  登录
                </Button>
              ) : userInfo.role === 'admin' ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/admin/login"
                >
                  进入面板
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleClick}
                  color="primary"
                >
                  开始购物
                </Button>
              )}
            </Grid>
            {!userInfo && (
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleClick}
                  color="primary"
                >
                  查询定价
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};
export default HeroSection;
