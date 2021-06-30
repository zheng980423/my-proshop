import { Helmet } from 'react-helmet';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Material Kit</title>
    </Helmet>
    <Box
      style={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: 您要找的界面不见了:(
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          您可能不小心访问了错误的链接来到了这里，请检查访问网址是否正确
        </Typography>
        <Box style={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/images/undraw_page_not_found_su7k.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560,
            }}
          />
        </Box>
        <Box style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
          >
            返回主页
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
