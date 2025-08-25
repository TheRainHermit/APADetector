import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import useT from '../../i18n/useT';

const About = () => {
  const t = useT();
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('aboutPage.title')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('aboutPage.description1')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('aboutPage.mission')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;