import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
   root: {
      position: 'relative'
   },
   hide: {
      display: 'none'
   },
   searchResults: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      background: '#fff',
      border: '1px solid #ddd',
      position: 'absolute',
      width: '100%',
      top: '46px',
      zIndex: '500',
      maxHeight: '242px',
      overflowY: 'scroll',
      '& li': {
         padding: '8px 16px'
      },
      '& li:hover': {
         background: '#ddd'
      }
   }
}));

function SearchBar(props) {
   const classes = useStyles();

   const [query, setQuery] = useState(props.initialValue || '')
   const [showSearchResults, setShowSearchResults] = useState(false);

   const handleChangeQuery = e => {
      setQuery(e.target.value)
      setShowSearchResults(e.target.value !== '');
   }

   const getFilteredData = () => {
      return props.data.filter(el => el[props.searchProperty].toLowerCase().includes(query.toLowerCase()));
   }

   const handleClickResult = obj => {
      props.onChange({ target: { value: obj[props.valueProperty] } });
      setQuery(obj[props.displayProperty]);
      setShowSearchResults(false);
   }

   return (
      <div className={clsx(props.className, classes.root)}>
         <ul className={clsx(classes.searchResults, {
               [classes.hide]: !showSearchResults || getFilteredData().length === 0
            })}
         >
            {
               getFilteredData().map((el, idx) => {
                  return (
                     <li key={idx} onClick={() => handleClickResult(el)}>
                        {el[props.displayProperty]}
                     </li>
                  );
               })
            }
         </ul>
         <TextField variant="standard" label={props.label ? props.label : 'Search'} value={query} onChange={handleChangeQuery} fullWidth />
      </div>
   );
}

SearchBar.propTypes = {
   data: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired,
   initialValue: PropTypes.string,
   displayProperty: PropTypes.string.isRequired,
   searchProperty: PropTypes.string.isRequired,
   valueProperty: PropTypes.string.isRequired,
   label: PropTypes.string
}

export default SearchBar;