import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const CenterContent = ({ children }) => (
  <div className="center-content-root">
    <div className="center-content">
      { children }
    </div>

    <style jsx>{`
      .center-content-root {
        width: 100%;
        text-align: center;
      }

      .center-content {
        display: inline-block;
      }
    `}</style>
  </div>
);

CenterContent.propTypes = propTypes;

export default CenterContent;
