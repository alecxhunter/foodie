import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Modal from '../modal';
import EditableList from '../../editable-list';
import { AppBar, Tab, Tabs, Box, TextField, Grid, FormHelperText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IngredientsTab from './ingredients-tab';

function TabPanel(props) {
   const { children, value, index } = props;

   return (
      <Typography
         component="div"
         hidden={value !== index}
      >
         {value === index && <Box p={1}>{children}</Box>}
      </Typography>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
   margin: {
      margin: theme.spacing(1),
   },
   marginRight: {
      marginRight: theme.spacing(1)
   },
   indicator: {
      background: theme.palette.primary.dark,
      height: 4
   },
   directionsList: {
      maxHeight: 400,
      overflowY: 'auto'
   }
}));

export default function NewRecipeModal(props) {
   const classes = useStyles();
   const [recipe, setRecipe] = useState({
      name: '',
      description: '',
      imageUrl: '',
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      directions: [],
      ingredients: []
   });
   const [selectedTabIdx, setSelectedTab] = useState(0);
   const [validationErrors, setValidationErrors] = useState({});

   const handleChangeRecipeProp = prop => e => {
      setRecipe({ ...recipe, [prop]: e.target.value });
   }

   const handleSaveNewRecipe = () => {
      //console.log('NewRecipeModal.handleSaveNewRecipe');
      //console.log(JSON.stringify(recipe, null, 3));

      fetch('http://localhost:5000/recipes', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify(recipe)
      }).then(res => {
         return res.json().then(data => ({ status: res.status, ...data }));
      }).then(data => {
         if (data.status === 200) {
            props.onSave(data.recipe);
         } else {
            console.log('Validation error.');
            console.log({ ...data.errors })
            setValidationErrors({ ...data.errors });
         }
      }).catch(err => {
         console.log('There was an error saving the recipe.');
      });
   }

   const handleChangeTab = (e, tab) => {
      setSelectedTab(tab);
   }

   const handleChangeDirection = idx => e => {
      let directions = [...recipe.directions];
      directions[idx].text = e.target.value;
      setRecipe({ ...recipe, directions });
   }

   const handleDeleteDirection = idx => {
      let directions = [...recipe.directions];
      setRecipe({
         ...recipe,
         directions: directions.filter((d, i) => idx != i).map((dir, idx) => dir['order'] = idx)
      });
   }

   const handleAddDirection = text => {
      let directions = [...recipe.directions, { text }];
      directions.map((dir, idx) => dir['order'] = idx)
      setRecipe({ ...recipe, directions });
   }

   const handleAddIngredient = ingr => {
      let ingredients = [...recipe.ingredients, ingr]
      setRecipe({ ...recipe, ingredients });
   }

   const handleChangeIngredient = (idx, val) => {
      let ingredients = [...recipe.ingredients];
      ingredients[idx] = val;
      setRecipe({ ...recipe, ingredients });
   }

   const handleDeleteIngredient = idx => {
      let ingredients = [...recipe.ingredients];
      setRecipe({ ...recipe, ingredients: ingredients.filter((ingr, i) => idx != i) });
   }

   return (
      <Modal
         title="Add new recipe"
         showModal={props.showModal}
         onClose={props.onClose}
         onSave={handleSaveNewRecipe} >
         <AppBar position="static">
            <Tabs variant="fullWidth" value={selectedTabIdx} onChange={handleChangeTab} classes={{indicator: classes.indicator}}>
               <Tab label="Info" />
               <Tab label="Ingredients" />
               <Tab label="Directions" />
            </Tabs>
         </AppBar>
         <TabPanel value={selectedTabIdx} index={0}>
            <Grid container spacing={1}>
               <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                     <TextField
                        key={props.showModal}
                        label="Recipe Name"
                        className={classes.margin}
                        fullWidth
                        variant="outlined"
                        value={recipe.name}
                        onChange={handleChangeRecipeProp('name')}
                        error={validationErrors.name ? true : false}
                        helperText={validationErrors.name || ' '}
                     />
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        key={props.showModal}
                        label="Prep Time(min)"
                        className={classes.marginRight}
                        type="number"
                        variant="outlined"
                        value={recipe.prepTime}
                        onChange={handleChangeRecipeProp('prepTime')}
                        error={validationErrors.prepTime ? true : false}
                        helperText={validationErrors.prepTime || ' '}
                     />
                  </Grid>
               </Grid>
               <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                     <TextField
                        key={props.showModal}
                        label="Description"
                        className={classes.margin}
                        multiline
                        fullWidth
                        rows="1"
                        rowsMax="3"
                        variant="outlined"
                        value={recipe.description}
                        onChange={handleChangeRecipeProp('description')}
                        error={validationErrors.description ? true : false}
                        helperText={validationErrors.description || ' '}
                     />
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        key={props.showModal}
                        label="Cook Time(min)"
                        className={classes.marginRight}
                        type="number"
                        variant="outlined"
                        value={recipe.cookTime}
                        onChange={handleChangeRecipeProp('cookTime')}
                        error={validationErrors.cookTime ? true : false}
                        helperText={validationErrors.cookTime || ' '}
                     />
                  </Grid>
               </Grid>
               <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                     <TextField
                        key={props.showModal}
                        label="Banner Image URL"
                        className={classes.margin}
                        fullWidth
                        variant="outlined"
                        value={recipe.imageUrl}
                        onChange={handleChangeRecipeProp('imageUrl')}
                        error={validationErrors.imageUrl ? true : false}
                        helperText={validationErrors.imageUrl || ' '}
                     />
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        key={props.showModal}
                        label="Servings"
                        className={classes.marginRight}
                        type="number"
                        variant="outlined"
                        value={recipe.servings}
                        onChange={handleChangeRecipeProp('servings')}
                        error={validationErrors.servings ? true : false}
                        helperText={validationErrors.servings || ' '}
                     />
                  </Grid>
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={1}>
            <IngredientsTab
               ingredients={recipe.ingredients}
               handleAddIngredient={handleAddIngredient}
               handleChangeIngredient={handleChangeIngredient}
               handleDeleteIngredient={handleDeleteIngredient}
            />
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={2}>
            <EditableList
               className={classes.directionsList}
               values={recipe.directions || []}
               displayProp="text"
               handleChangeValue={handleChangeDirection}
               handleAddNewValue={handleAddDirection}
               handleDeleteValue={handleDeleteDirection}
            />
         </TabPanel>
      </Modal>
   )
}