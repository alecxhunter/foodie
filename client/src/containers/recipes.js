import React, { useState } from 'react';
import RecipeCard from '../components/recipe-card';
import NewRecipeModal from '../components/modals/new-recipe-modal';
import { Grid, Button } from '@material-ui/core';

export default function Recipes() {
   const [recipes, setRecipes] = useState([
      {
         id: 1,
         name: 'One-Skillet Alfredo Chicken',
         description: 'This is a long description of how to cook chicken in a pan with pasta. It tastes good and is easy to make. Simple as that.',
         shortDescription: 'This is a short description of how to cook alfredo chicken.',
         image: 'https://via.placeholder.com/800x300?text=Recipe+Image',
         prepTime: '15 min',
         cookTime: '30 min',
         servings: 6,
         instructions: 'Do this and do that...',
         ingredients: [
            {
               name: 'Chicken Breast',
               amount: 2
            },
            {
               name: 'Penne Pasta',
               amount: 1,
               measurement: 'lb'
            },
            {
               name: 'Whipping Cream',
               amount: 1.5,
               measurement: 'cup'
            },
            {
               name: 'Chicken Broth',
               amount: 4,
               measurement: 'cup'
            },
            {
               name: 'Parmesean Cheese',
               amount: 1,
               measurement: 'cup'
            }
         ],
         directions: [
            'Cook chicken in pan until brown',
            'Remove chicken then add chicken broth and simmer for 5 minutes',
            'Add pasta and cook for about 8 minutes until soft',
            'Add whipping cream and let simmer for 4 minutes'
         ]
      },
      {
         id: 2,
         name: 'Hibachi Steak',
         description: 'This is a long description of how to cook a simple japanese dish. More text. More text. Longer and longer.',
         shortDescription: 'This is a short description of how to cook hibachi steak.',
         image: 'https://via.placeholder.com/800x300?text=Recipe+Image',
         prepTime: '10 min',
         cookTime: '30 min',
         servings: 6,
         instructions: 'Do this and do that...',
         ingredients: [
            {
               name: 'Steak',
               amount: 2
            },
            {
               name: 'Basmati Rice',
               amount: 1,
               measurement: 'cup'
            },
            {
               name: 'Zucchini',
               amount: 1
            },
            {
               name: 'Onion',
               amount: 0.5
            },
            {
               name: 'Water',
               amount: 2,
               measurement: 'cup'
            }
         ],
         directions: [
            'Bring 2 cups of water to a boil in a pot',
            'Add rice to pot, turn heat down to low, and cover the pot. Let cook for 20 minutes then set it aside. Do not take the cover off.',
            'Cut up onions and zucchini',
            'Generously salt and pepper both sides of the steaks',
            'Put a large non-stick pan on medium-high heat and add 2 tsp of olive oil'
         ]
      }
   ]);
   const [showModal, setShowModal] = useState(false);

   const handleCloseNewRecipe = () => {
      setShowModal(false);
   }

   const handleSaveNewRecipe = (recipe) => {
      console.log('Recipes.handleSaveNewRecipe');
      console.log(JSON.stringify(recipe));
        
      setShowModal(false);
   }

   const handleClickNewRecipeBtn = () => {
      setShowModal(true);
   }

   return (
      <Grid container spacing={0}>
         <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleClickNewRecipeBtn}>Submit New Recipe</Button>
         </Grid>
         <Grid item xs={12}>
            <Grid container spacing={4} justify="center">
               {
                  recipes.map(recipe => (
                     <Grid item key={recipe.id} xs={6}>
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