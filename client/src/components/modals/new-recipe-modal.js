import React, { useState, useEffect, Fragment, useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Modal from './modal';
import SearchBar from '../search-bar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import { AppBar, Button, List, ListItem, ListItemIcon, IconButton, ListItemText, Tab, Tabs, Box, TextField, Grid, FormHelperText, InputAdornment, Typography, ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <Typography
         component="div"
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
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
   }
}));

export default function NewRecipeModal(props) {
   const classes = useStyles();
   const [recipe, setRecipe] = useState({
      name: '',
      description: '',
      shortDescription: '',
      image: '',
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      instructions: '',
      directions: []
   });
   const [nextDirection, setNextDirection] = useState('');
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

   const handleChangeDirectionText = idx => e => {
      let directions = [...recipe.directions];
      directions[idx].text = e.target.value;
      setRecipe({ ...recipe, directions });
   }

   const handleChangeNextDirection = e => {
      setNextDirection(e.target.value);
   }

   const handleDeleteDirection = idx => {
      let directions = [...recipe.directions];
      setRecipe({ ...recipe, directions: directions.filter((d, i) => idx != i)});
   }

   const handleChangeDirectionEditState = (idx, val) => {
      let directions = [...recipe.directions];
      directions[idx].edit = val;
      setRecipe({ ...recipe, directions });
   }

   const handleAddNextDirection = () => {
      let directions = [...recipe.directions, {text: nextDirection, edit: false}];
      recipe.directions = directions;
      setRecipe(recipe);
      setNextDirection('');
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
            <Tabs variant="fullWidth" value={selectedTabIdx} onChange={handleChangeTab}>
               <Tab label="Info" id="new-recipe-tab-0" aria-controls="new-recipe-tabpanel-0" />
               <Tab label="Directions" id="new-recipe-tab-1" aria-controls="new-recipe-tabpanel-1" />
               <Tab label="Ingredients" id="new-recipe-tab-2" aria-controls="new-recipe-tabpanel-2" />
            </Tabs>
         </AppBar>
         <TabPanel value={selectedTabIdx} index={0}>
            <form>
               <div>
                  <TextField
                     key={props.showModal}
                     label="Recipe Name"
                     className={clsx(classes.margin, classes.textField)}
                     variant="outlined"
                     value={recipe.name}
                     onChange={handleChangeRecipeProp('name')}
                  />
               </div>
               <div>
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
               </div>
               <div>
                  <TextField
                     key={props.showModal}
                     label="Banner Image URL"
                     className={clsx(classes.margin, classes.textField)}
                     variant="outlined"
                     value={recipe.image}
                     onChange={handleChangeRecipeProp('image')}
                  />
               </div>
               <Grid container spacing={2}>
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
            </form>
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={1}>
            <div className="recipe-direction-tab">
               <List>
                  {(recipe.directions || []).map((dir, idx) => {
                     return (
                        <ListItem key={idx}>
                           {
                              dir.edit ? 
                                 <Fragment>
                                    <TextField
                                       key={props.showModal}
                                       label="Edit Direction"
                                       variant="outlined"
                                       className={classes.dirInput}
                                       multiline
                                       rowsMax={3}
                                       value={dir.text}
                                       onChange={handleChangeDirectionText(idx)}
                                    />
                                    <ListItemIcon>
                                       <IconButton edge="end" onClick={() => handleChangeDirectionEditState(idx, false)}>
                                          <DoneIcon />
                                       </IconButton>
                                    </ListItemIcon>
                                 </Fragment>
                                 :
                                 <Fragment>
                                    <ListItemIcon>
                                       <IconButton edge="end" onClick={() => handleDeleteDirection(idx)}>
                                          <DeleteIcon />
                                       </IconButton>
                                    </ListItemIcon>
                                    {<ListItemText primary={<Typography component="p">{dir.text}</Typography>} />}
                                    <ListItemIcon>
                                       <IconButton edge="end" onClick={() => handleChangeDirectionEditState(idx, true)}>
                                          <EditIcon />
                                       </IconButton>
                                    </ListItemIcon>
                                 </Fragment>
                           }
                        </ListItem>
                     )
                  })}
                  <ListItem>
                     <TextField
                        key={props.showModal}
                        label="Next Direction"
                        variant="outlined"
                        className={classes.dirInput}
                        multiline
                        rowsMax={3}
                        value={nextDirection}
                        onChange={handleChangeNextDirection}
                     />
                     <ListItemIcon>
                        <IconButton edge="end" onClick={handleAddNextDirection}>
                           <AddIcon />
                        </IconButton>
                     </ListItemIcon>
                  </ListItem>
               </List>
            </div>
         </TabPanel>
         <TabPanel value={selectedTabIdx} index={2}>
            <div className="recipe-ingredients-tab">
               <SearchBar
                  data={allIngredients}
                  searchProperty="name"
                  displayProperty="name"
                  valueProperty="id"
                  handleResultSelected={handleIngredientSearchResult}
               />
            </div>
         </TabPanel>
      </Modal>
   )
}