import React, { Component } from 'react';
import { connectStateResults } from 'react-instantsearch/connectors';
import { 
  Hits,
  Pagination
  } from 'react-instantsearch/dom';

import SearchRow from './SearchRow';

// const SearchRow = ({hit}) => {
//   return (
//     <div>
//       {hit.name}
//       <p>Category:{hit.category}</p>
//     </div>
//     );
// }

const SearchTable = connectStateResults(
  ({ searchState, searchResults }) =>
   searchResults && searchResults.nbHits !== 0
     ? <div className="results-table-body">
          <Hits hitComponent={SearchRow}/>
          <div className="results-pagination">
            <Pagination />
          </div>
        </div>
     : <div>
         No results have been found for {searchState.query}
       </div>
);

export default SearchTable;
