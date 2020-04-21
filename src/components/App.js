import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme'; 
import Header from './ui/Header'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      Hello!
    </ThemeProvider>
  );
}

export default App;
