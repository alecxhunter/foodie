import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Toolbar, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';

import Recipes from './containers/recipes';
import theme from './theme';
import NavBar from './components/navbar';

const useStyles = makeStyles(theme => ({
   margin: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2)
   }
}));

function App() {
   const classes = useStyles();
   return (
      <MuiThemeProvider theme={theme}>
         <CssBaseline />
         <AppBar color="primary" position="fixed">
            <Toolbar>
               <NavBar />
            </Toolbar>
         </AppBar>
         <Toolbar />
         <main className={classes.margin}>
            <Recipes />
         </main>
      </MuiThemeProvider>
   )
}

ReactDOM.render(<App />, document.getElementById("app"));