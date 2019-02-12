/** *********************************
 * V4 CardsLayout component
 ********************************** */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './CardsLayout.style';

const {
  string,
  node,
  arrayOf,
  oneOfType,
} = PropTypes;

const CardsLayout = ({
  sectionHeading,
  sectionHeading2,
  children,
}) => (
  <Fragment>
    <div className="heading">
      <h1>{sectionHeading}</h1>
      <h2>{sectionHeading2}</h2>
    </div>
    <div className="cells-wrapper">
      {children}
    </div>
    <style jsx>{styles}</style>
  </Fragment>
);

CardsLayout.propTypes = {
  sectionHeading: string.isRequired,
  sectionHeading2: string.isRequired,
  children: oneOfType([
    arrayOf(PropTypes.node),
    node,
  ]).isRequired,
};

export default CardsLayout;
