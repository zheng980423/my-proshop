import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AccountProfile = ({ history }) => {
  const userDetails = useSelector(state => state.userDetails);
  const { loading, user } = userDetails;
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);
  return (
    <Card>
      <CardContent>
        <Box
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={loading ? '' : user.image}
            style={{
              height: 200,
              width: 200,
            }}
          />
          {loading ? (
            ''
          ) : (
            <>
              <Typography color="textPrimary" gutterBottom variant="h3">
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`来自 ${user.location} `}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`个性签名： ${user.biography}`}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                我的关注:{user.followings ? user.followings.length : 0}
                关注我的:{user.followers ? user.followers.length : 0}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
      {/* <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default AccountProfile;
