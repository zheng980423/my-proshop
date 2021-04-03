import React from 'react';
import { Container, Typography } from '@material-ui/core';
const Footer = () => {
  return (
    <footer>
      <Container>
        <Typography
          align="center"
          variant="h6"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Copyright &copy; proshop
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
