import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Card, CardActions, CardMedia, CardContent, Typography, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import RecipeDetails from './recipe-details';

const useStyles = makeStyles(theme => ({
   expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: 'rotate(180deg)',
   },
   bottomGutter: {
      marginBottom: theme.spacing(1)
   },
   noPadding: {
      padding: 0
   },
   cardHeader: {
      position: 'relative'
   },
   cardHeaderDetails: {
      position: 'absolute',
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      width: '100%',
      padding: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between'
   }
}));

export default function RecipeCard(props) {
   const classes = useStyles();
   const [expanded, setExpanded] = useState(false);

   const handleClickExpand = () => {
      setExpanded(!expanded);
   }

   return (
      <Card>
         <div className={classes.cardHeader}>
            <CardMedia
               component="img"
               alt="Recipe image"
               height="300px"
               image={props.recipe.imageUrl}
               title={props.recipe.name}
            />
            <div className={classes.cardHeaderDetails}>
               <Typography variant="body1">Prep Time: {props.recipe.prepTime} min</Typography>
               <Typography variant="body1" align={'center'}>Cook Time: {props.recipe.cookTime} min</Typography>
               <Typography variant="body1" align={'right'}>{props.recipe.servings} Servings</Typography>
            </div>
         </div>
         <CardContent>
            <Typography variant="h4" gutterBottom>{props.recipe.name}</Typography>
            <Typography component="p" className={classes.bottomGutter}>{props.recipe.description}</Typography>
         </CardContent>
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <RecipeDetails recipe={props.recipe} />
            </CardContent>
         </Collapse>
         <CardActions className={classes.noPadding}>
            <Button
               onClick={handleClickExpand}
               size="large"
               fullWidth
            >
               <ExpandMoreIcon className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
               })} />
            </Button>
         </CardActions>
      </Card>
   )
}