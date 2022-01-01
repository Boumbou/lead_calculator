import React from 'react';
import './App.css';
import TopBar from './components/AppBar';
import MainContent from './components/MainContent';
import { Grid } from '@mui/material';

function App() {
  

  return (
    <div>
      <TopBar/>
      <Grid container direction="row">
          <Grid item xs={1} md={3}/>
          <Grid item xs={10} md={6} alignContent="center" >
            <MainContent/>
          </Grid>
          <Grid item xs={1} md={3}/>
      </Grid>
      
    </div>
    
  );
}

export default App;
