import React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from './features/Header';
import { DedupePanel } from './features/DedupePanel';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <Container
        style={{height: '100vh'}}
    >
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Compare Classes</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Toolbar />
        <Header />
        <DedupePanel />
      </Box>
    </Container>
  );
}

export default App;
