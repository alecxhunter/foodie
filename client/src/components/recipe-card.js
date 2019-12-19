import React, { useState } from 'react';
import clsx from 'clsx';
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Grid, IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import RecipeDetails from './recipe-details';

const useStyles = makeStyles(theme => ({
   card: {
      maxWidth: 345,
   },
   media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
   },
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: 'rotate(180deg)',
   },
   avatar: {
      backgroundColor: red[500],
   },
}));

export default function RecipeCard(props) {
   const classes = useStyles();
   const [expanded, setExpanded] = useState(false);

   const handleClickExpand = () => {
      setExpanded(!expanded);
   }

   return (
      <Card>
         <CardActionArea>
            <CardMedia
               component="img"
               alt="Recipe image"
               height="300px"
               image={props.recipe.image}
               title={props.recipe.name}
            />
            <CardContent>
               <Typography gutterBottom variant="h4">{props.recipe.name}</Typography>
               <Typography component="p">{props.recipe.description}</Typography>
               <Grid container spacing={4} justify="space-between" direction="row">
                  <Grid item>
                     <Typography variant="body1">Prep Time: {props.recipe.prepTime} min</Typography>
                  </Grid>
                  <Grid item>
                     <Typography variant="body1" align={'center'}>Cook Time: {props.recipe.cookTime} min</Typography>
                  </Grid>
                  <Grid item>
                     <Typography variant="body1" align={'right'}>Servings: {props.recipe.servings}</Typography>
                  </Grid>
               </Grid>
            </CardContent>
         </CardActionArea>
         <CardActions>
            <IconButton
               className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
               })}
               onClick={handleClickExpand}
               aria-expanded={expanded}
               aria-label="show more">
               <ExpandMoreIcon />
            </IconButton>
         </CardActions>
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <RecipeDetails recipe={props.recipe} />
            </CardContent>
         </Collapse>
      </Card>
   )
}