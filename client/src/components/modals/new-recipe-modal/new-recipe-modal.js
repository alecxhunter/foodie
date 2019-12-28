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
      overflowY: 'scroll'
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

   const handleChangeRecipeProp = prop => e => {
      setRecipe({ ...recipe, [prop]: e.target.value });
   }

   const handleSaveNewRecipe = () => {
      props.onSave(recipe);
   }

   const handleChangeTab = (e, tab) => {
      setSelectedTab(tab);
   }

   const handleChangeDirection = idx => e => {
      let directions = [...recipe.directions];
      directions[idx] = e.target.value;
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
               <Tab label="Directions" />
               <Tab label="Ingredients" />
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
                     />
                     <FormHelperText>&nbsp;</FormHelperText>
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        key={props.showModal}
                        label="Prep Time"
                        className={classes.marginRight}
                        type="number"
                        variant="outlined"
                        value={recipe.prepTime}
                        onChange={handleChangeRecipeProp('prepTime')}
                     />
                     <FormHelperText>Minutes</FormHelperText>
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
                     />
                     <FormHelperText>&nbsp;</FormHelperText>
                  </Grid>
                  <Grid item xs={3}>
                     <TextField
                        key={props.showModal}
                        label="Cook Time"
                        className={classes.marginRight}
                        type="number"
                        variant="outlined"
                        value={recipe.cookTime}
                        onChange={handleChangeRecipeProp('cookTime')}
                     />
                     <FormHelperText id="standard-weight-helper-text">Minutes</FormHelperText>
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
                     />
                  </Grid>
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={1}>
            <EditableList
               className={classes.directionsList}
               values={recipe.directions || []}
               displayProp="text"
               handleChangeValue={handleChangeDirection}
               handleAddNewValue={handleAddDirection}
               handleDeleteValue={handleDeleteDirection}
            />
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={2}>
            <IngredientsTab
               ingredients={recipe.ingredients}
               handleAddIngredient={handleAddIngredient}
               handleChangeIngredient={handleChangeIngredient}
               handleDeleteIngredient={handleDeleteIngredient}
            />
         </TabPanel>
      </Modal>
   )
}