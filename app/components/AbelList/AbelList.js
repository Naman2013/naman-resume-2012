import React from 'react';
import PropTypes from 'prop-types';

const AbelList = ({ list }) => (
  <ul>
    { list.map(item => <li>{item}</li>) }
  </ul>
);

AbelList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

AbelList.defaultProps = {
  list: [],
};

export default AbelList;
