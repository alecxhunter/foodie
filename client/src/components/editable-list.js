import React, { useState, Fragment } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, TextField, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';

export default function EditableList(props) {
   const [editStates, setEditStates] = useState(Array(props.values.length).fill(false));
   const [newValue, setNewValue] = useState('');

   const handleChangeEditState = (idx, val) => {
      let states = [...editStates];
      states[idx] = val;
      setEditStates(states);
   }

   const handleChangeNewValue = e => {
      setNewValue(e.target.value);
   }

   const handleAddNewValue = () => {
      props.handleAddNewValue(newValue);
      setNewValue('');
      // Push default edit state for new value
      setEditStates([...editStates, false]);
   }

   const handleDeleteValue = idx => {
      props.handleDeleteValue(idx);
      setEditStates([...editStates.filter((s, i) => i != idx)]);
   }

   return (
      <List>
         {(props.values || []).map((value, idx) => {
            return (
               <ListItem key={idx}>
                  {
                     editStates[idx] ?
                        <Fragment>
                           <TextField
                              label="Edit"
                              variant="outlined"
                              fullWidth
                              multiline
                              rowsMax={3}
                              value={value[props.displayProp]}
                              onChange={props.handleChangeValue(idx)}
                           />
                           <ListItemIcon>
                              <IconButton edge="end" onClick={() => handleChangeEditState(idx, false)}>
                                 <DoneIcon />
                              </IconButton>
                           </ListItemIcon>
                        </Fragment>
                        :
                        <Fragment>
                           <ListItemIcon>
                              <IconButton edge="end" onClick={() => handleDeleteValue(idx)}>
                                 <DeleteIcon />
                              </IconButton>
                           </ListItemIcon>
                           <ListItemText primary={<Typography component="p">{value[props.displayProp]}</Typography>} />
                           <ListItemIcon>
                              <IconButton edge="end" onClick={() => handleChangeEditState(idx, true)}>
                                 <EditIcon />
                              </IconButton>
                           </ListItemIcon>
                        </Fragment>
                  }
               </ListItem>
            )
         })}
         <ListItem>
            <TextField
               label="Next Direction"
               variant="outlined"
               fullWidth
               multiline
               rowsMax={3}
               value={newValue}
               onChange={handleChangeNewValue}
            />
            <ListItemIcon>
               <IconButton edge="end" onClick={handleAddNewValue}>
                  <AddIcon />
               </IconButton>
            </ListItemIcon>
         </ListItem>
      </List>
   )
}