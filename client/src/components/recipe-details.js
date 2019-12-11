import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const formatIngredient = ingredient => {
   return `${ingredient.amount} ${ingredient.measurement ? ingredient.measurement : ''} ${ingredient.name}`
}

export default function RecipeDetails(props) {
   return (
      <div className="recipe-details">
         <Grid container spacing={1}>
            <Grid item xs={6}>
               <Typography variant="h5">Directions</Typography>
               <ol>
               {
                  props.recipe.directions.map((dir, idx) =>
                     <li key={idx}>
                        <Typography variant="subtitle1">{dir}</Typography>
                     </li>
                  )
               }
               </ol>
            </Grid>
            <Grid item xs={6}>
               <Typography variant="h5">Ingredients</Typography>
               <Grid container spacing={1}>
                  {
                     props.recipe.ingredients.map((ingr, idx) =>
                        <Grid item xs={6} key={idx}>
                           <Typography variant="subtitle1">{formatIngredient(ingr)}</Typography>
                        </Grid>
                     )
                  }
               </Grid>
            </Grid>
         </Grid>
      </div>
   )
}