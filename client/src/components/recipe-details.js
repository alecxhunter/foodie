import React from 'react';
import { Grid, List, ListItem, Typography } from '@material-ui/core';

const formatIngredient = ingredient => {
   return `${ingredient.amount} ${ingredient.measurement ? ingredient.measurement.measurement : ''} ${ingredient.ingredient.name}`
}

export default function RecipeDetails(props) {
   console.log(props.recipe.ingredients);
   return (
      <div className="recipe-details">
         <Grid container spacing={4}>
            <Grid item xs={4}>
               <Typography variant="h5">Ingredients</Typography>
               <List>
                  {
                     props.recipe.ingredients.map((ingr, idx) =>
                        <ListItem key={idx} disableGutters>
                           <Typography variant="subtitle1">{formatIngredient(ingr)}</Typography>
                        </ListItem>
                     )
                  }
               </List>
            </Grid>
            <Grid item xs={8}>
               <Typography variant="h5">Directions</Typography>
               <List>
                  {
                     props.recipe.directions.map((dir, idx) =>
                        <ListItem key={idx} disableGutters>
                           <Typography variant="subtitle1">{dir.text}</Typography>
                        </ListItem>
                     )
                  }
               </List>
            </Grid>
         </Grid>
      </div>
   )
}