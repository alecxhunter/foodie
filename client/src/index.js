import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Recipes from "./containers/recipes";
import { AppBar, Toolbar } from "@material-ui/core";
import NavBar from "./components/navbar";
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => (
   <Fragment>
      <CssBaseline />
      <AppBar color="primary" position="static">
         <Toolbar>
            <NavBar />
         </Toolbar>
      </AppBar>
      <main>
          <Recipes />
      </main>
   </Fragment>
)

ReactDOM.render(<App />, document.getElementById("app"));