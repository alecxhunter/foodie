import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, List, ListItem, ListItemIcon, InputLabel, FormControl, Select, MenuItem, IconButton, TextField, ListItemText, Typography } from '@material-ui/core';
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
   },
   fullWidth: {
      width: '100%'
   },
   ingredientsList: {
      maxHeight: 400,
      overflowY: 'auto'
   }
}));

function IngredientsTab(props) {
   const classes = useStyles();
   const [allIngredients, setAllIngredients] = useState([]);
   const [allIngredientMeasurements, setAllIngredientMeasurements] = useState([]);
   const [nextIngredient, setNextIngredient] = useState({
      ingredientId: 0,
      measurementId: 0,
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
      // If updating ingredientId, then set the default measurement as well
      if (prop === 'ingredientId' && allIngredients.find(i => i.id === e.target.value)) {
         const ingr = allIngredients.find(i => i.id === e.target.value);
         setNextIngredient({
            ...nextIngredient,
            ingredientId: e.target.value,
            measurementId: ingr.default_measurement ? ingr.default_measurement.id : 0
         });
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
      // If updating ingredientId, then set the default measurement as well
      if (prop === 'ingredientId' && allIngredients.find(i => i.id === e.target.value)) {
         const tmp = allIngredients.find(i => i.id === e.target.value);
         ingr.measurementId = tmp.default_measurement ? tmp.default_measurement.id : 0;
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
         ingredientId: 0,
         measurementId: 0,
         amount: 0
      });
   }

   const getIngredientProp = (id, prop) => {
      const ingr = allIngredients.find(i => i.id === id);
      return ingr ? ingr[prop] : '';
   }

   const getMeasurementProp = (id, prop) => {
      const meas = allIngredientMeasurements.find(m => m.id === id);
      return meas ? meas[prop] : '';
   }

   return (
      <Fragment>
         <List className={classes.ingredientsList}>
            {
               props.ingredients.map((ingr, idx) => {
                  return (
                     <ListItem key={idx} disableGutters>
                        {
                           editStates[idx] ?
                              <Fragment>
                                 <SearchBar
                                    className={clsx(classes.margin, classes.fullWidth)}
                                    data={allIngredients}
                                    selectedValue={ingr.ingredientId}
                                    onChange={changeIngredientProp(idx, 'ingredientId')}
                                    searchProperty="name"
                                    displayProperty="name"
                                    valueProperty="id"
                                    label="Ingredient"
                                 />
                                 <FormControl className={clsx(classes.formControl, classes.margin)}>
                                    <InputLabel>Measurement</InputLabel>
                                    <Select
                                       value={ingr.measurementId}
                                       onChange={changeIngredientProp(idx, 'measurementId')}
                                    >
                                       <MenuItem value={0}>None</MenuItem>
                                       {
                                          allIngredientMeasurements.map(ingrMeas => {
                                             return (
                                                <MenuItem key={ingrMeas.id} value={ingrMeas.id}>
                                                   {ingrMeas.description}
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
                                 <ListItemText primary={<Typography component="p">{`${ingr.amount} ${getMeasurementProp(ingr.measurementId, 'measurement')} ${getIngredientProp(ingr.ingredientId, 'name')}`}</Typography>} />
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
         </List>
         <div style={{display: 'flex'}}>
            <SearchBar
               className={clsx(classes.margin, classes.fullWidth)}
               data={allIngredients}
               selectedValue={nextIngredient.ingredientId}
               onChange={handleChangeNextIngredientProp('ingredientId')}
               searchProperty="name"
               displayProperty="name"
               valueProperty="id"
               label="Ingredient"
            />
            <FormControl className={clsx(classes.formControl, classes.margin)}>
               <InputLabel>Measurement</InputLabel>
               <Select
                  value={nextIngredient.measurementId}
                  onChange={handleChangeNextIngredientProp('measurementId')}
               >
                  <MenuItem value={0}>None</MenuItem>
                  {
                     allIngredientMeasurements.map(ingrMeas => {
                        return (
                           <MenuItem key={ingrMeas.id} value={ingrMeas.id}>
                              {ingrMeas.description}
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
            <IconButton onClick={addIngredient}>
               <AddIcon />
            </IconButton>
         </div>
      </Fragment>
   );
}

IngredientsTab.propTypes = {
   ingredients: PropTypes.array.isRequired,
   handleAddIngredient: PropTypes.func.isRequired,
   handleChangeIngredient: PropTypes.func.isRequired,
   handleDeleteIngredient: PropTypes.func.isRequired
}

export default IngredientsTab;