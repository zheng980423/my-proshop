import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';

const ProfileScreen = ({ history }) => {
  return (
    <>
      <Box
        style={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          paddingBottom: '3rem',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile history={history} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails history={history} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ProfileScreen;
