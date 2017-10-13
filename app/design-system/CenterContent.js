import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const CenterContent = ({ children }) => (
  <div className="center-content">
    { children }

    <style jsx>{`
      .center-content {
        width: fit-content;
        margin: 0 auto;
      }
    `}</style>
  </div>
);

CenterContent.propTypes = propTypes;

export default CenterContent;
