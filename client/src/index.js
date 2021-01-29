import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';

import Recipes from './containers/recipes';
import Planner from './containers/planner';
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
         <BrowserRouter>
            <Fragment>
               <AppBar color="primary" position="fixed">
                  <NavBar />
               </AppBar>
               <Toolbar />
               <main className={classes.margin}>
                  <Route exact path="/" component={Planner} />
                  <Route path="/recipes" component={Recipes} />
                  <Route path="/planner" component={Planner} />
               </main>
            </Fragment>
         </BrowserRouter>
      </MuiThemeProvider>
   )
}

ReactDOM.render(<App />, document.getElementById("app"));