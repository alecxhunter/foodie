import React, { useEffect, useState, Fragment } from 'react';
import clsx from 'clsx';
import { GridList, GridListTile, Typography, ButtonBase, Box, TextField, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {

  },
  month: {
    textTransform: 'uppercase'
  },
  grid: {
    position: 'relative',
  },
  tile: {
    borderRight: '1px solid #777',
    borderBottom: '1px solid #777',
    '&:first-child': {
      borderLeft: '1px solid #777'
    },
    '&:nth-child(7n+1)': {
      borderLeft: '1px solid #777'
    },
    '&:nth-child(-n+7)': {
      borderTop: '1px solid #777'
    },
    background: '#f1f0eb',
    cursor: 'pointer',
    '&:hover': {
      background: '#ddd'
    },
    top: '50%',
    left: '50%'
  },
  notInMonth: {
    cursor: 'default',
    '&:nth-child(odd)': {
      backgroundImage: 'linear-gradient(45deg, #4c4c4d 25%, #000000 25%, #000000 50%, #4c4c4d 50%, #4c4c4d 75%, #000000 75%, #000000 100%)',
      backgroundSize: '40px 40px',
      color: '#fff'
    },
    '&:nth-child(even)': {
      backgroundImage: 'linear-gradient(135deg, #4c4c4d 25%, #000000 25%, #000000 50%, #4c4c4d 50%, #4c4c4d 75%, #000000 75%, #000000 100%)',
      backgroundSize: '40px 40px',
      color: '#fff'
    }
  },
  dayIndicator: {
    color: '#inherit',
    fontSize: '3em',
    fontWeight: 'bold',
    padding: theme.spacing(1)
    /* position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1) */
  },
  selectedTile: {
    width: '100% !important',
    height: '100% !important',
    position: 'absolute',
    zIndex: 1000,
    border: '1px solid #777',
    top: 0,
    left: 0,
    zIndex: 100
  },
  input: {
    padding: theme.spacing(1),
    '& .MuiInput-input': {
      padding: theme.spacing(3),
      textAlign: 'center'
    }
  }
}));

const getVisbleDaysForDate = date => {
  const arr = [];

  // Get first day of the month
  const startDt = new Date(date.getFullYear(), date.getMonth(), 1)
  // Back up to first Sunday
  startDt.setDate(-(startDt.getDay() - 1));

  // Get first day of next month
  const endDt = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  // Back up to last day of last month
  endDt.setDate(0);
  // Move to last Saturday
  endDt.setDate(endDt.getDate() + (7 - endDt.getDay()))

  const numDays = (endDt - startDt) / (1000 * 60 * 60 * 24);

  for (let i = 0; i < numDays; i++) {
    arr.push({
      date: new Date(startDt),
      selected: false
    });
    startDt.setDate(startDt.getDate() + 1);
  }

  return arr;
};

function Planner() {
  const classes = useStyles();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [visibleDays, setVisibleDays] = useState(getVisbleDaysForDate(new Date()));
  const [plannedMeals, setPlannedMeals] = useState([]);
  const [recipes, setRecipes] = useState([]);

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

  const handleAddNewPlannedMeal = day => e => {
    e.stopPropagation();
    setPlannedMeals([...plannedMeals, {day: day, recipe: {}}]);
  }

  const handleClickDay = day => {
    // Check if this date is in the current month
    if (day.date.getMonth() != month) return;

    setVisibleDays(visibleDays.map(d => {
      if (d == day) {
        return { ...d, ['selected']: !day.selected }
      } else {
        return d
      }
    }));
  }

  const getFocusedView = day => {
    // Check if any meals are planned for this day
    const plannedMeal = plannedMeals.find(m => m.day == day.date);
    if (plannedMeal) {
      return (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          height="100%"
          onClick={e => e.stopPropagation()}
        >
          <TextField
            className={classes.input}
            variant="standard"
            select
            value={plannedMeal.recipe.id || 0}
            fullWidth
            onChange={() => 7}
          >
            <MenuItem value={0}>- - - -</MenuItem>
            {
              recipes.map(recipe => {
                return (
                  <MenuItem key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </MenuItem>
                )
              })
            }
          </TextField>
        </Box>
      )
    } else {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          onClick={handleAddNewPlannedMeal(day.date)}
        >
          <Typography variant="h2" align="center">No meals planned! Click to add...</Typography>
        </Box>
      )
    }
  }

  const getUnfocusedView = day => {
    return '';
  }

  return (
    <Fragment>
      <Typography variant="h1" align="center" gutterBottom className={classes.month}>
        {new Date(year, month).toLocaleString('default', { month: 'long' })}
      </Typography>
      <GridList cols={7} className={classes.grid}>
        {
          visibleDays.map((day, idx) => {
            return (
              <GridListTile
                key={idx}
                className={clsx(classes.tile, {
                  [classes.notInMonth]: day.date.getMonth() != month,
                  [classes.selectedTile]: day.selected
                })}
                onClick={() => handleClickDay(day)}
              >
                <Typography variant="h1" className={classes.dayIndicator}>{day.date.getDate()}</Typography>
                { day.selected ? getFocusedView(day) : getUnfocusedView(day) }
              </GridListTile>
              
            )
          })
        }
      </GridList>
    </Fragment>
  )
}

export default Planner;