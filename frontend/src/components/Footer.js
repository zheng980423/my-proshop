import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';
const Footer = () => {
  return (
    <footer>
      <Container style={{ marginBottom: '2rem' }}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Proshop
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
