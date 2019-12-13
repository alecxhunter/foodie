import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';

function SearchBar(props) {
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

   let searchResultsClasses = classNames({
      'search-results': true,
      'hide': !showSearchResults || getFilteredData().length === 0
   });

   return (
      <div className="search-bar">
         <ul className={searchResultsClasses}>
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
         <div className="search-query">
            <TextField variant="standard" label={props.label ? props.label : 'Search'} value={query} onChange={handleChangeQuery} />
         </div>
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