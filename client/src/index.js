import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Recipes from "./containers/recipes";
import { AppBar, Toolbar, CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import NavBar from "./components/navbar";

const App = () => (
   <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar color="primary" position="static">
         <Toolbar>
            <NavBar />
         </Toolbar>
      </AppBar>
      <main style={{overflowX: 'hidden'}}>
          <Recipes />
      </main>
   </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));