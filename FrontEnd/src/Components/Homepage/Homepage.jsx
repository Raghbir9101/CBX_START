// src/App.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Paper, Container, CssBaseline } from '@mui/material';

const HomePage = () => {
  const styles = {
    header: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '15px 0',
      textAlign: 'center'
    },
    container: {
      marginTop: '20px',
    },
    paper: {
      padding: '20px',
      textAlign: 'center',
      color: '#333'
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            My Start Page
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HomePage;
