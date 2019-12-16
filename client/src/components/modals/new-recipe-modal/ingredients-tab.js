import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { List, ListItem, ListItemIcon, InputLabel, FormControl, Select, MenuItem, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from '../../search-bar';

const useStyles = makeStyles(theme => ({
   formControl: {
      minWidth: 140
   },
   margin: {
      margin: theme.spacing(1)
   }
}))

function IngredientsTab(props) {
   const classes = useStyles();
   const [allIngredients, setAllIngredients] = useState([]);
   const [allIngredientMeasurements, setAllIngredientMeasurements] = useState([]);
   const [nextIngredient, setNextIngredient] = useState({
      name: '',
      measurement: '',
      amount: 0
   });

   useEffect(() => {
      fetch('http://localhost:5000/ingredients')
         .then(res => {
            return res.json();
         }).then(data => {
            setAllIngredients(data);
         });
      fetch('http://localhost:5000/ingredientMeasurements')
         .then(res => {
            return res.json();
         }).then(data => {
            setAllIngredientMeasurements(data);
         });
   }, []);

   const handleNextIngredientNameSelected = ingr => {
      setNextIngredient({ ...nextIngredient, name: ingr.name, measurement: ingr.default_measurement });
   }

   const handleChangeNextIngredientProp = prop => e => {
      setNextIngredient({ ...nextIngredient, [prop]: e.target.value });
   }

   const addIngredient = () => {
      props.handleAddIngredient(nextIngredient);
      setNextIngredient({
         name: '',
         measurement: '',
         amount: 0
      });
   }

   return (
      <List>
         <ListItem>
            <SearchBar
               className={classes.margin}
               data={allIngredients}
               searchProperty="name"
               displayProperty="name"
               valueProperty="id"
               label="Ingredient"
               handleResultSelected={handleNextIngredientNameSelected}
            />
            <FormControl className={clsx(classes.formControl, classes.margin)}>
               <InputLabel>Measurement</InputLabel>
               <Select
                  value={nextIngredient.measurement}
                  onChange={handleChangeNextIngredientProp('measurement')}
               >
                  {
                     allIngredientMeasurements.map(ingrMeas => {
                        return (
                           <MenuItem key={ingrMeas.id} value={ingrMeas.measurement}>
                              {ingrMeas.name}
                           </MenuItem>
                        )
                     })
                  }
               </Select>
            </FormControl>
            <TextField
               label="Amount"
               value={nextIngredient.amount}
               type="number"
               onChange={handleChangeNextIngredientProp('amount')}
               className={classes.margin}
            />
            <ListItemIcon>
               <IconButton edge="end" onClick={addIngredient}>
                  <AddIcon />
               </IconButton>
            </ListItemIcon>
         </ListItem>
      </List>
   );
}

IngredientsTab.propTypes = {
   ingredients: PropTypes.array.isRequired,
   handleAddIngredient: PropTypes.func.isRequired,
   handleChangeIngredient: PropTypes.func.isRequired
}

export default IngredientsTab;