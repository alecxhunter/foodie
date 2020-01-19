import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Modal from '../modal';
import EditableList from '../../editable-list';
import { AppBar, Tab, Tabs, Box, TextField, Grid, FormHelperText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IngredientsTab from './ingredients-tab';

const useStyles = makeStyles(theme => ({
   gutters: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
   },
   padding: {
      padding: theme.spacing(1)
   },
   input: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
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

function TabPanel(props) {
   const classes = useStyles();
   const { children, value, index } = props;

   return (
      <Typography
         component="div"
         hidden={value !== index}
      >
         {value === index && <Box p={1} /* className={classes.padding} */>{children}</Box>}
      </Typography>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

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
      console.log('NewRecipeModal.handleSaveNewRecipe');
      console.log(JSON.stringify(recipe, null, 3));

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
         directions: directions.filter((d, i) => idx != i).map((d, i) => { return { ...d, order: i }})
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
            <TextField
               key={props.showModal ? 0 : 10}
               className={classes.input}
               label="Recipe Name"
               fullWidth
               variant="outlined"
               value={recipe.name}
               onChange={handleChangeRecipeProp('name')}
               error={validationErrors.name ? true : false}
               helperText={validationErrors.name || ''}
            />
            <TextField
               key={props.showModal ? 1 : 11}
               className={classes.input}
               label="Description"
               multiline
               fullWidth
               rows="1"
               rowsMax="3"
               variant="outlined"
               value={recipe.description}
               onChange={handleChangeRecipeProp('description')}
               error={validationErrors.description ? true : false}
               helperText={validationErrors.description || ''}
            />
            <TextField
               key={props.showModal ? 2 : 12}
               className={classes.input}
               label="Banner Image URL"
               fullWidth
               variant="outlined"
               value={recipe.imageUrl}
               onChange={handleChangeRecipeProp('imageUrl')}
               error={validationErrors.imageUrl ? true : false}
               helperText={validationErrors.imageUrl || ''}
            />
            <Grid container spacing={2}>
               <Grid item xs={4}>
                  <TextField
                     key={props.showModal ? 3 : 13}
                     className={classes.input}
                     label="Prep Time(min)"
                     type="number"
                     variant="outlined"
                     value={recipe.prepTime}
                     onChange={handleChangeRecipeProp('prepTime')}
                     error={validationErrors.prepTime ? true : false}
                     helperText={validationErrors.prepTime || ' '}
                  />
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     key={props.showModal ? 4 : 14}
                     className={classes.input}
                     label="Cook Time(min)"
                     type="number"
                     variant="outlined"
                     value={recipe.cookTime}
                     onChange={handleChangeRecipeProp('cookTime')}
                     error={validationErrors.cookTime ? true : false}
                     helperText={validationErrors.cookTime || ' '}
                  />
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     key={props.showModal ? 5 : 15}
                     className={classes.input}
                     label="Servings"
                     type="number"
                     variant="outlined"
                     value={recipe.servings}
                     onChange={handleChangeRecipeProp('servings')}
                     error={validationErrors.servings ? true : false}
                     helperText={validationErrors.servings || ' '}
                  />
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={1}>
         {Array.isArray(validationErrors.ingredients) && <Typography color="error" align="center" variant="body2">{validationErrors.ingredients}</Typography>}
            <IngredientsTab
               ingredients={recipe.ingredients}
               handleAddIngredient={handleAddIngredient}
               handleChangeIngredient={handleChangeIngredient}
               handleDeleteIngredient={handleDeleteIngredient}
               errors={validationErrors.ingredients && !Array.isArray(validationErrors.ingredients) ? validationErrors.ingredients : {}}
            />
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={2}>
            {Array.isArray(validationErrors.directions) && <Typography color="error" align="center" variant="body2">{validationErrors.directions}</Typography>}
            <EditableList
               className={classes.directionsList}
               values={recipe.directions || []}
               displayProp="text"
               handleChangeValue={handleChangeDirection}
               handleAddNewValue={handleAddDirection}
               handleDeleteValue={handleDeleteDirection}
               errors={validationErrors.directions && !Array.isArray(validationErrors.directions) ? validationErrors.directions : {}}
            />
         </TabPanel>
      </Modal>
   )
}