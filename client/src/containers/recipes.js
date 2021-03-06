import React, { useState, useEffect, Fragment } from 'react';
import RecipeCard from '../components/recipe-card';
import NewRecipeModal from '../components/modals/new-recipe-modal/new-recipe-modal';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   margin: {
      margin: theme.spacing(1)
   }
}))

export default function Recipes() {
   const classes = useStyles();
   const [recipes, setRecipes] = useState([]);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      fetch('http://localhost:5000/recipes')
         .then(res => {
            return res.json();
         }).then(data => {
            console.log('recipes loaded')
            console.log(data)
            setRecipes(data);
         });
   }, []);

   const handleCloseNewRecipe = () => {
      setShowModal(false);
   }

   const handleSaveNewRecipe = recipe => {
      /* console.log('Recipes.handleSaveNewRecipe');
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
         console.log(data);
         
         if (data.status === 200) { 
            setRecipes([...recipes, data.recipe]);
            setShowModal(false);
         } else {
            console.log('Validation error.');

         }
      }).catch(err => {
         console.log('There was an error saving the recipe.');
      }); */

      setRecipes([...recipes, recipe]);
      setShowModal(false);
   }

   const handleClickNewRecipeBtn = () => {
      setShowModal(true);
   }

   return (
      <Fragment>
         <Button className={classes.margin} variant="contained" color="primary" onClick={handleClickNewRecipeBtn}>Submit New Recipe</Button>
         <Grid container spacing={4} justify="center">
            {
               recipes.map(recipe => (
                  <Grid item key={recipe.id} sm={12} md={6}>
                     <RecipeCard recipe={recipe} />
                  </Grid>
               ))
            }
         </Grid>
         <NewRecipeModal
            showModal={showModal}
            onClose={handleCloseNewRecipe}
            onSave={handleSaveNewRecipe}
         />
      </Fragment>
   )
}