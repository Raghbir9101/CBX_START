// import { Button } from '@mui/material'
// import React from 'react'

// function Login() {
//   return (
//     <div>
//         <Button onClick={()=>window.location.href = "http://localhost/auth/google"}>
//             Login With Google
//         </Button>
//     </div>
//   )
// }

// export default Login


// src/App.js
import React from 'react';
import { Container, Box, Button, Typography, CssBaseline, TextField } from '@mui/material';

const App = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'white',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    logo: {
      marginBottom: '20px',
    },
    button: {
      marginTop: '20px',
      backgroundColor: '#4285F4',
      color: 'white',
    },
  };

  return (
    <>
      <Container style={styles.container}>
        <Box style={styles.box}>
          <Typography variant="h5" component="div">
            Sign in with Google
          </Typography>
          <Button
            variant="contained"
            style={styles.button}
            onClick={()=>window.location.href = "http://localhost/auth/google"}
          >
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default App;
