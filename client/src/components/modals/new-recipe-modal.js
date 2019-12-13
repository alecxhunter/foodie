import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Modal from './modal';
import EditableList from '../editable-list';
import SearchBar from '../search-bar';
import { AppBar, Tab, Tabs, Box, TextField, Grid, FormHelperText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
   root: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   margin: {
      margin: theme.spacing(1),
   },
   withoutLabel: {
      marginTop: theme.spacing(3),
   },
   textField: {
      width: 300,
   },
   label: {
      backgroundColor: 'white'
   },
   dirInput: {
      width: '100%'
   },
   indicator: {
      background: theme.palette.primary.dark,
      height: '4px'
   }
}));

export default function NewRecipeModal(props) {
   const classes = useStyles();
   const [recipe, setRecipe] = useState({
      name: '',
      description: '',
      image: '',
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      directions: [],
      ingredients: []
   });
   const [selectedTabIdx, setSelectedTab] = useState(0);
   const [allIngredients, setAllIngredients] = useState([]);

   useEffect(() => {
      console.log('loading ingredients');
      fetch('http://localhost:5000/ingredients')
         .then(res => {
            return res.json();
         }).then(data => {
            setAllIngredients(data)
         })
   }, []);

   const handleChangeRecipeProp = prop => e => {
      setRecipe({...recipe, [prop]: e.target.value })
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
      setRecipe({ ...recipe, directions: directions.filter((d, i) => idx != i)});
   }

   const handleAddDirection = dir => {
      let directions = [...recipe.directions, dir];
      setRecipe({ ...recipe, directions });
   }

   const handleIngredientSearchResult = ingr => {
      console.log('Selected ' + ingr);
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
               <Grid item xs={12}>
                  <TextField
                     key={props.showModal}
                     label="Recipe Name"
                     className={clsx(classes.margin, classes.textField)}
                     variant="outlined"
                     value={recipe.name}
                     onChange={handleChangeRecipeProp('name')}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     key={props.showModal}
                     label="Description"
                     className={clsx(classes.margin, classes.textField)}
                     multiline
                     fullWidth
                     rows="1"
                     rowsMax="3"
                     variant="outlined"
                     value={recipe.description}
                     onChange={handleChangeRecipeProp('description')}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     key={props.showModal}
                     label="Banner Image URL"
                     className={clsx(classes.margin, classes.textField)}
                     variant="outlined"
                     value={recipe.image}
                     onChange={handleChangeRecipeProp('image')}
                  />
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     key={props.showModal}
                     label="Prep Time"
                     type="number"
                     variant="outlined"
                     value={recipe.prepTime}
                     onChange={handleChangeRecipeProp('prepTime')}
                  />
                  <FormHelperText id="standard-weight-helper-text">Minutes</FormHelperText>
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     key={props.showModal}
                     label="Cook Time"
                     type="number"
                     variant="outlined"
                     value={recipe.cookTime}
                     onChange={handleChangeRecipeProp('cookTime')}
                  />
                  <FormHelperText id="standard-weight-helper-text">Minutes</FormHelperText>
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     key={props.showModal}
                     label="Servings"
                     type="number"
                     variant="outlined"
                     value={recipe.servings}
                     onChange={handleChangeRecipeProp('servings')}
                  />
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={1}>
            <EditableList
               values={recipe.directions || []}
               handleChangeValue={handleChangeDirection}
               handleAddNewValue={handleAddDirection}
               handleDeleteValue={handleDeleteDirection}
            />
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={2}>
            <SearchBar
               data={allIngredients}
               searchProperty="name"
               displayProperty="name"
               valueProperty="id"
               label="Ingredient"
               handleResultSelected={handleIngredientSearchResult}
            />
         </TabPanel>
      </Modal>
   )
}