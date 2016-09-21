import React from 'react';

const FilterLink = ( props ) => (
  <li className="col-md-3 action-container">
    <a
      href={`/#telecope-overview/${props.obsUniqueId}`}
      className="button">
      {props.obsMenuName}
    </a>
  </li>
);

export default FilterLink;
