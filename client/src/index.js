import React from "react";
import ReactDOM from "react-dom";
import Recipes from "./containers/recipes";

const App = () => (
  <div className="fluid-container">
      <header className="navigation">
          <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Recipes</a></li>
          </ul>
      </header>
      <main className="main-content">
          <Recipes />
      </main>
  </div>
)

ReactDOM.render(<App />, document.getElementById("app"));