import { makeStyles } from '@material-ui/core/styles';

// const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.default,
//   display: 'flex',
//   height: '100%',
//   overflow: 'hidden',
//   width: '100%',
// }));

// const DashboardLayoutWrapper = experimentalStyled('div')(({ theme }) => ({
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
//   paddingTop: 64,
//   [theme.breakpoints.up('lg')]: {
//     paddingLeft: 256,
//   },
// }));

// const DashboardLayoutContainer = experimentalStyled('div')({
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
// });

// const DashboardLayoutContent = experimentalStyled('div')({
//   flex: '1 1 auto',
//   height: '100%',
//   overflow: 'auto',
// });

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 256,
    // },
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
