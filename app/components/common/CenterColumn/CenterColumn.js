import React from 'react';
import PropTypes from 'prop-types';

const CenterColumn = ({ children }) => (
  <div className="root">
    {children}

    <style jsx>
      {`

      `}
    </style>
  </div>
);

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterColumn;
