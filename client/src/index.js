import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Toolbar, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Recipes from './containers/recipes';
import theme from './theme';
import NavBar from './components/navbar';

const App = () => (
   <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar color="primary" position="static">
         <Toolbar>
            <NavBar />
         </Toolbar>
      </AppBar>
      <main style={{overflow: 'hidden', marginRight: theme.spacing(2), marginLeft: theme.spacing(2)}}>
          <Recipes />
      </main>
   </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));