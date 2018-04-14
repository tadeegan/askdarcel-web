import React from 'react';
import { connectStateResults } from 'react-instantsearch/connectors';
import {
  Hits,
  Pagination,
  } from 'react-instantsearch/dom';

import SearchRow from './SearchRow';

const SearchTable = () => (
  <div className="results-table-body">
   <Hits hitComponent={SearchRow} />
   <div className="results-pagination">
     <Pagination
       padding={2}
       showLast
     />
   </div>
  </div>
);

export default SearchTable;
