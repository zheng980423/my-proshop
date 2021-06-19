import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: '免费',
    price: '0',
    description: [
      '个人中心界面',
      '2 GB 的使用内存',
      '有限访问帮助中心',
      '邮箱服务',
    ],
    buttonText: '登录享受免费套餐',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: '强力推荐',
    price: '15',
    description: [
      '商家管理中心界面',
      '10 GB 使用内存',
      '无限制访问帮助中心',
      '优先的邮箱服务',
    ],
    buttonText: '开始体验',
    buttonVariant: 'contained',
  },
  {
    title: '企业级',
    price: '30',
    description: [
      '企业级管理中心界面',
      '30 GB 使用内存',
      '无限制访问帮助中心',
      '电话以及邮箱服务',
    ],
    buttonText: '联系我们',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: '公司',
    description: ['团队', '历史', '联系我们', '位置'],
  },
  {
    title: '特色',
    description: [
      '可视化服务',
      '用户管理中心',
      '团队解决方案',
      '用户体验支持',
      '专家咨询',
    ],
  },
  {
    title: '合作伙伴',
    description: ['百度', '谷歌', '搜狐', '网易'],
  },
  {
    title: '法律',
    description: ['隐私条款', '使用条例'],
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          定价
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          如果您想体验更优质的服务，请考虑我们的定价方案，15天体验，7天无条件退款，
          1-1的售后通道，不满意随时咨询我们
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map(line => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
