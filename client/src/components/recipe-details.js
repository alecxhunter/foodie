import React from 'react';
import { Grid, List, ListItem, Typography } from '@material-ui/core';

const formatIngredient = ingredient => {
   return `${ingredient.amount} ${ingredient.measurement ? ingredient.measurement : ''} ${ingredient.name}`
}

export default function RecipeDetails(props) {
   return (
      <div className="recipe-details">
         <Grid container spacing={1}>
            <Grid item xs={3}>
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
            <Grid item xs={9}>
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