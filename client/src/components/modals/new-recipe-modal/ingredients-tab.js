import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { List, ListItem, ListItemIcon, InputLabel, FormControl, Select, MenuItem, IconButton, TextField, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
   const [editStates, setEditStates] = useState(Array(props.ingredients.length).fill(false));

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

   const handleChangeNextIngredientProp = prop => e => {
      // If updating the name property, set the default measurement property as well
      if (prop === 'name' && allIngredients.find(i => i.name === e.target.value)) {
         let ingr = allIngredients.find(i => i.name === e.target.value);
         setNextIngredient({ ...nextIngredient, [prop]: e.target.value, measurement: ingr.default_measurement ? ingr.default_measurement : '' });
      } else {
         setNextIngredient({ ...nextIngredient, [prop]: e.target.value });
      }
   }

   const handleChangeEditState = (idx, val) => {
      let states = [...editStates];
      states[idx] = val;
      setEditStates(states);
   }

   const changeIngredientProp = (idx, prop) => e => {
      let ingr = props.ingredients[idx];
      ingr[prop] = e.target.value;
      // If updating the name property, set the default measurement property as well
      if (prop === 'name' && allIngredients.find(i => i.name === e.target.value)) {
         let tmp = allIngredients.find(i => i.name === e.target.value);
         ingr.measurement = tmp.default_measurement ? tmp.default_measurement : '';
      }
      props.handleChangeIngredient(idx, ingr);      
   }

   const deleteIngredient = idx => {
      props.handleDeleteIngredient(idx);
      setEditStates([...editStates.filter((s, i) => i != idx)]);
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
         {
            props.ingredients.map((ingr, idx) => {
               return (
                  <ListItem key={idx}>
                     {
                        editStates[idx] ?
                           <Fragment>
                              <SearchBar
                                 className={classes.margin}
                                 data={allIngredients}
                                 value={ingr.name}
                                 onChange={changeIngredientProp(idx, 'name')}
                                 searchProperty="name"
                                 displayProperty="name"
                                 valueProperty="id"
                                 label="Ingredient"
                              />
                              <FormControl className={clsx(classes.formControl, classes.margin)}>
                                 <InputLabel>Measurement</InputLabel>
                                 <Select
                                    value={ingr.measurement}
                                    onChange={changeIngredientProp(idx, 'measurement')}
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
                                 value={ingr.amount}
                                 type="number"
                                 onChange={changeIngredientProp(idx, 'amount')}
                                 className={classes.margin}
                              />
                              <ListItemIcon>
                                 <IconButton edge="end" onClick={() => handleChangeEditState(idx, false)}>
                                    <DoneIcon />
                                 </IconButton>
                              </ListItemIcon>
                           </Fragment>
                           :
                           <Fragment>
                              <ListItemIcon>
                                 <IconButton edge="end" onClick={() => deleteIngredient(idx)}>
                                    <DeleteIcon />
                                 </IconButton>
                              </ListItemIcon>
                              <ListItemText primary={<Typography component="p">{`${ingr.amount} ${ingr.measurement} ${ingr.name}`}</Typography>} />
                              <ListItemIcon>
                                 <IconButton edge="end" onClick={() => handleChangeEditState(idx, true)}>
                                    <EditIcon />
                                 </IconButton>
                              </ListItemIcon>
                           </Fragment>
                     }
                  </ListItem>
               );
            })
         }
         <ListItem>
            <SearchBar
               className={classes.margin}
               data={allIngredients}
               value={nextIngredient.name}
               onChange={handleChangeNextIngredientProp('name')}
               searchProperty="name"
               displayProperty="name"
               valueProperty="id"
               label="Ingredient"
            />
            <FormControl className={clsx(classes.formControl, classes.margin)}>
               <InputLabel>Measurement</InputLabel>
               <Select
                  value={nextIngredient.measurement}
                  onChange={handleChangeNextIngredientProp('measurement')}
               >
                  <MenuItem value="">None</MenuItem>
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
   handleChangeIngredient: PropTypes.func.isRequired,
   handleDeleteIngredient: PropTypes.func.isRequired
}

export default IngredientsTab;