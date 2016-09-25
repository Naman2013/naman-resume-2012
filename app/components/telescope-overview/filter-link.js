import React from 'react';
import { Link } from 'react-router'

const FilterLink = ( { obsUniqueId, obsMenuName } ) => (
  <Link
    to={`/telescope-overview/${obsUniqueId}`}
    activeClassName="active"
    className="button">
      {obsMenuName}
  </Link>
);

export default FilterLink;
