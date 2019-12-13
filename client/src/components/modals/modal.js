import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
   root: {
      background: 'rgba(0,0,0,0.6)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      zIndex: 200
   },
   modal: {
      width: '560px',
      margin: '0 auto',
      background: '#eee',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
         width: '100%',
         margin: '0 8px'
      },
      '& > header': {
         background: theme.palette.primary.dark,
         color: '#fff',
         '& button': {
            color: '#fff'
         }
      },
      '& footer': {
         textAlign: 'center',
         borderTop: '1px solid #ddd',
         marginTop: theme.spacing(1),
         marginBottom: theme.spacing(1)
      }
   },
   title: {
      margin: theme.spacing(1)
   }
}));

const Modal = props => {
   const classes = useStyles();
   const handleBackgroundClick = (e) => {
      if (e.target === e.currentTarget) props.onClose();
   };

   return (
      <div className={classes.root}
         style={{display: `${!props.showModal ? 'none' : 'flex'}`}}
         onClick={handleBackgroundClick}>
         <div className={classes.modal}>
            <header>
               <Grid container spacing={0} justify="space-between" alignItems="center">
                  <Grid item>
                     <Typography className={classes.title}>{props.title}</Typography>
                  </Grid>
                  <Grid item>
                     <Button onClick={props.onClose}>Close</Button>
                  </Grid>
               </Grid>
            </header>
            <section>
               {props.children}
            </section>
            { props.onSave ? 
               <footer>
                  <Button variant="contained" color="primary" onClick={props.onSave}>Save</Button>
               </footer> 
               : '' 
            }
         </div>
      </div>
   );
};

Modal.propTypes = {
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};

export default Modal;