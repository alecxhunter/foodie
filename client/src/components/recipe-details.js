import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const RecipeDetails = (props) => {
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
            </Grid>
         </Grid>
      </div>
   )
};

export default RecipeDetails;