import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const HorizontalList = ({ list }) => (
  <Fragment>
    <ul>
      <li>Test</li>
    </ul>
  </Fragment>
);

HorizontalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HorizontalList;
