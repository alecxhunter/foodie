import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/recipe-card';
import NewRecipeModal from '../components/modals/new-recipe-modal/new-recipe-modal';
import { Grid, Button } from '@material-ui/core';

export default function Recipes() {
   const [recipes, setRecipes] = useState([]);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      fetch('http://localhost:5000/recipes')
         .then(res => {
            return res.json();
         }).then(data => {
            setRecipes(data);
         });
   }, []);

   const handleCloseNewRecipe = () => {
      setShowModal(false);
   }

   const handleSaveNewRecipe = recipe => {
      console.log('Recipes.handleSaveNewRecipe');
      console.log(JSON.stringify(recipe));

      fetch('http://localhost:5000/recipes', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify(recipe)
      }).then(res => {
         return res.json();
      }).then(data => {
         setRecipes([...recipes, data]);
      });
        
      setShowModal(false);
   }

   const handleClickNewRecipeBtn = () => {
      setShowModal(true);
   }

   return (
      <Grid container spacing={1}>
         <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleClickNewRecipeBtn}>Submit New Recipe</Button>
         </Grid>
         <Grid item xs={12}>
            <Grid container spacing={4} justify="center">
               {
                  recipes.map(recipe => (
                     <Grid item key={recipe.id} sm={12} md={6}>
                        <RecipeCard recipe={recipe} />
                     </Grid>
                  ))
               }
            </Grid>
         </Grid>
         <NewRecipeModal
            showModal={showModal}
            onClose={handleCloseNewRecipe}
            onSave={handleSaveNewRecipe}
         />
      </Grid>
   )
}