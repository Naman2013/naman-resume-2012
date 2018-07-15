import React from 'react';
import PropTypes from 'prop-types';
import style from './CenterColumn.style';

const CenterColumn = ({ children, theme }) => (
  <div className="root" style={theme}>
    {children}

    <style jsx>{style}</style>
  </div>
);

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
};

CenterColumn.defaultProps = {
  theme: {},
};

export default CenterColumn;
