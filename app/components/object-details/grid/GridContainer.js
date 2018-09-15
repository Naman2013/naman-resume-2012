import React from 'react';
import PropTypes from 'prop-types';
import style from './GridContainer.style';

const GridContainer = ({ children, theme }) => (
  <section
    style={theme}
    className="object-details-grid-container"
  >
    {children}
    <style jsx>{style}</style>
  </section>
);

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({ }),
};

GridContainer.defaultProps = {
  theme: {},
};

export default GridContainer;
