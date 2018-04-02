import React from 'react';
import { connectStateResults } from 'react-instantsearch/connectors';
import {
  Hits,
  Pagination,
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
   searchResults && searchResults.nbHits === 0
     ? <div>
         No results have been found for {searchState.query}
     </div>
      :
     <div className="results-table-body">
       <Hits hitComponent={SearchRow} />
       <div className="results-pagination">
         <Pagination
           totalPages={5}
           showLast={true}
         />
       </div>
     </div>,
);

export default SearchTable;
