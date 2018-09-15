import React from 'react';
import PropTypes from 'prop-types';
import style from './GridContainer.style';

const GridContainer = ({ children }) => (
  <section className="object-details-grid-container">
    {children}
    <style jsx>{style}</style>
  </section>
);

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridContainer;
