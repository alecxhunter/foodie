import React from 'react';
import { Route, NavLink } from 'react-router-dom'
import Dashboard from './dashboard'
import Rooms from './rooms'
import Strains from './strains'

const App = () => (
  <div className="app">
    <header className="top-nav">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="active" className="nav-link">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/rooms" activeClassName="active" className="nav-link">Rooms</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/strains" activeClassName="active" className="nav-link">Strains</NavLink>
        </li> */}
      </ul>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route path="/rooms" component={Rooms} />
      {/* <Route path="/strains" component={Strains} /> */}
    </main>
  </div>
)

export default App