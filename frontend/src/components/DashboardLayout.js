// import { makeStyles } from '@material-ui/core/styles';
// import { useState } from 'react';
// import DashboardNavbar from './DashboardNavbar';
// import DashboardSidebar from './DashboardSidebar';

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.default,
//     display: 'flex',
//     height: '100%',
//     overflow: 'hidden',
//     width: '100%',
//   },
//   wrapper: {
//     display: 'flex',
//     flex: '1 1 auto',
//     overflow: 'hidden',
//     paddingTop: 64,
//     [theme.breakpoints.up('lg')]: {
//       paddingLeft: 256,
//     },
//   },
//   container: {
//     display: 'flex',
//     flex: '1 1 auto',
//     overflow: 'hidden',
//   },
//   content: {
//     flex: '1 1 auto',
//     height: '100%',
//   },
// }));

// const DashboardLayout = ({ children }) => {
//   const classes = useStyles();
//   const [isMobileNavOpen, setMobileNavOpen] = useState(false);

//   return (
//     <div className={classes.root}>
//       <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
//       <DashboardSidebar
//         onMobileClose={() => setMobileNavOpen(false)}
//         openMobile={isMobileNavOpen}
//       />
//       <div className={classes.wrapper}>
//         <div className={classes.container}>
//           <div className={classes.content}>{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
