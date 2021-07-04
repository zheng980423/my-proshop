import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StarSvg from '../svgs/stars.svg';
import React from 'react';
import Lottie from 'react-lottie';
import { Link as RouterLink } from 'react-router-dom';
import animationData from '../lotties/ecommerce-ani.json';
import { motion } from 'framer-motion';
const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 0, 6),
    position: 'relative',
    zIndex: '10',
    // height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    // [theme.breakpoints.up('lg')]: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //       },
  },
  stars: {
    backgroundImage: `url(${StarSvg})`,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
}));

const HeroSection = ({ userInfo }) => {
  const classes = useStyles();
  const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const smallScreen = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#scroll-to-main-product'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={classes.heroContent}>
      <div className={classes.stars}></div>
      <Grid
        container
        direction={largeScreen ? 'row-reverse' : 'column'}
        spacing={2}
        className={classes.container}
        justify="center"
      >
        <Grid xs={12} sm={12} md={6} item>
          <Lottie
            options={defaultOptions}
            height={largeScreen ? 500 : smallScreen ? 400 : 200}
            width={largeScreen ? 500 : smallScreen ? 400 : 200}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.textGroup}>
          <Typography
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
            variant="h1"
            align={largeScreen ? 'inherit' : 'center'}
            color="textPrimary"
            gutterBottom
          >
            {!userInfo
              ? '你想要的东西在proshop中都能找到！'
              : userInfo.role === 'admin'
              ? '欢迎，管理员！'
              : '你想要的东西在proshop中都能找到！'}
          </Typography>
          <Typography
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
            align={largeScreen ? 'inherit' : 'center'}
            color="textSecondary"
            paragraph
            style={{ margin: largeScreen ? '32px 0' : '16px 0' }}
          >
            {!userInfo
              ? '请登录以享受购物、聊天室、等更多服务'
              : userInfo.role === 'admin'
              ? '欢迎使用管理用户，商品，订单等服务'
              : '正品低价、品质保障、配送及时、轻松购物！ 多快好省 只为品质生活‎。'}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid
              container
              component={motion.div}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 0.8,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                  },
                },
              }}
              spacing={2}
              justify={largeScreen ? 'flex-start' : 'center'}
            >
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
        </Grid>
      </Grid>
    </div>
  );
};
export default HeroSection;
