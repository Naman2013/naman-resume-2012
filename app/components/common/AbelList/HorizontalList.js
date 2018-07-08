import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const HorizontalList = ({ list }) => (
  <Fragment>
    <ul>
      {list.map(entry => <li key={`horizontal-list-${entry}`}>{entry}</li>)}
    </ul>
  </Fragment>
);

HorizontalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HorizontalList;
