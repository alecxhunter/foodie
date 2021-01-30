import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { GridList, GridListTile, Typography, ButtonBase } from '@material-ui/core';

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
    transition: 'all 1s ease'
  },
  notInMonth: {
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
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1)
  },
  selectedTile: {
    width: '100% !important',
    height: '100% !important',
    position: 'absolute',
    zIndex: 1000
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
      date: new Date(startDt)
    });
    startDt.setDate(startDt.getDate() + 1);
  }

  return arr;
};

export default function Planner() {
  const classes = useStyles();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [visibleDays, setVisibleDays] = useState(getVisbleDaysForDate(new Date()));

  const handleClickDay = day => {
    console.log('clicked: ', day);
    setVisibleDays(visibleDays.map(d => {
      if (d == day) {
        return { ...d, ['selected']: true }
      } else {
        return d
      }
    }));
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
              </GridListTile>
              
            )
          })
        }
      </GridList>
    </Fragment>
  )
}