import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
   root: {
      position: 'relative'
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

   const [query, setQuery] = useState('');
   const [showSearchResults, setShowSearchResults] = useState(false);

   const handleChangeQuery = e => {
      setQuery(e.target.value);
      setShowSearchResults(e.target.value !== '');
   }

   const getFilteredData = () => {
      return props.data.filter(el => el[props.searchProperty].toLowerCase().includes(query.toLowerCase()));
   }

   const handleClickResult = obj => {
      setQuery(obj[props.searchProperty]);
      setShowSearchResults(false);
      props.handleResultSelected(obj);
   }

   return (
      <div className={classes.root}>
         <ul className={classes.searchResults}
            style={{ display: `${(!showSearchResults || getFilteredData().length === 0) ? 'none' : 'block'}` }}>
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
         <TextField variant="standard" label={props.label ? props.label : 'Search'} value={query} onChange={handleChangeQuery} />
      </div>
   );
}

SearchBar.propTypes = {
   data: PropTypes.array.isRequired,
   displayProperty: PropTypes.string.isRequired,
   searchProperty: PropTypes.string.isRequired,
   valueProperty: PropTypes.string.isRequired,
   handleResultSelected: PropTypes.func.isRequired,
   label: PropTypes.string
}

export default SearchBar;