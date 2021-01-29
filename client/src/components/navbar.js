import React from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';

import { AppBar, Tabs, Tab } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   root: {
      textTransform: 'uppercase'
   },
   indicator: {
      background: '#fff',
      height: 4
    },
    selected: {
      color: '#fff'
    }
}));

const NavBar = props => {
   const classes = useStyles();

   return (
      <Tabs 
         value={`/${location.pathname.split('/')[1]}`}
         classes={{indicator: classes.indicator}}
         className={classes.root}
      >
         <Tab
            label="Home"
            component={React.forwardRef(
               (props, ref) => (
                 <NavLink to="/" {...props} />
               )
             )}
             value="/" 
             classes={{selected: classes.selected}}
         />
         <Tab 
            label="Recipes"
            component={React.forwardRef(
               (props, ref) => (
               <NavLink to="/recipes" {...props} />
               )
            )}
            value="/recipes" 
            classes={{selected: classes.selected}}
         />
         <Tab
            label="Planner"
            component={React.forwardRef(
               (props, ref) => (
               <NavLink to="/planner" {...props} />
               )
            )}
            value="/planner" 
            classes={{selected: classes.selected}}
         />
      </Tabs>
      
   )
};

export default NavBar;