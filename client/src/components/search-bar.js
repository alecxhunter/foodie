import React, { useState, useEffect } from 'react';
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
      zIndex: 500,
      maxHeight: '242px',
      overflowY: 'auto',
      '& li': {
         padding: '8px 16px'
      },
      '& li:hover': {
         background: '#ddd'
      }
   },
   helperText: {
      margin: '8px 8px 0'
   }
}));

function SearchBar(props) {
   const classes = useStyles();

   const [query, setQuery] = useState('');
   const [showSearchResults, setShowSearchResults] = useState(false);

   useEffect(() => {
      // Reset query if selected value does not exist
      if (!props.data.find(d => d[props.valueProperty] === props.selectedValue))
         setQuery('');
   }, [props.selectedValue]);

   const handleChangeQuery = e => {
      const obj = props.data.find(el => el[props.searchProperty].toLowerCase() === e.target.value.toLowerCase());

      // Reset the selected value if no match
      if (!obj) {
         props.onChange({ target: { value: 0 } });
      }

      setQuery(e.target.value);
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

   const handleQueryBlur = e => {
      const obj = props.data.find(el => el[props.searchProperty].toLowerCase() === query.toLowerCase());
      if (obj) {
         setQuery(obj[props.displayProperty]);
         props.onChange({ target: { value: obj[props.valueProperty] } });
         setShowSearchResults(false);
      }
   }

   const getQuery = () => {
      const val = props.data.find(el => el[props.valueProperty] === props.selectedValue);
      return val ? val[props.displayProperty] : query;
   }

   return (
      <div className={clsx(props.className, classes.root)}>
         <TextField
            variant="outlined"
            label={props.label ? props.label : 'Search'}
            value={getQuery()}
            onChange={handleChangeQuery}
            onBlur={handleQueryBlur}
            fullWidth
            error={props.errors ? true : false}
            helperText={props.errors || ''}
            FormHelperTextProps={{ classes: { root: classes.helperText }}}
         />
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
      </div>
   );
}

SearchBar.propTypes = {
   data: PropTypes.array.isRequired,
   selectedValue: PropTypes.any.isRequired,
   onChange: PropTypes.func.isRequired,
   initialValue: PropTypes.string,
   displayProperty: PropTypes.string.isRequired,
   searchProperty: PropTypes.string.isRequired,
   valueProperty: PropTypes.string.isRequired,
   label: PropTypes.string
}

export default SearchBar;