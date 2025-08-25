import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Paper, Snackbar, Alert } from '@mui/material';
import { Email as EmailIcon, LocationOn as LocationIcon, Phone as PhoneIcon } from '@mui/icons-material';
import useT from '../../i18n/useT';

const Contact = () => {
  const t = useT();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ open: false, success: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitStatus({ open: true, success: true });
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t('contactPage.title')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('contactPage.subtitle')}
            </Typography>
            
            <Box sx={{ mt: 4, '& > div': { mb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon color="primary" sx={{ mr: 2 }} />
                <Typography>{t('contactPage.info.address')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography>{t('contactPage.info.email')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography>{t('contactPage.info.phone')}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="name"
                label={t('contactPage.form.name')}
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                name="email"
                label={t('contactPage.form.email')}
                variant="outlined"
                margin="normal"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                name="message"
                label={t('contactPage.form.message')}
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ mt: 2 }}
              >
                {t('contactPage.form.submit')}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar 
        open={submitStatus.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={submitStatus.success ? 'success' : 'error'}>
          {submitStatus.success ? t('contactPage.form.success') : t('contactPage.form.error')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;