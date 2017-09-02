import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import Feature from './feature';

const Features = ({ features_array, openPopup, closeAllPopup }) => (
  <ul className="features">
    {
      features_array.map(feature => (
        <Feature
          key={uniqueId('features_')}
          content={feature.content}
          id={feature.id}
          tooltip={feature.tooltip}
          liNot={feature.liNot}
          openPopup={openPopup}
          closePopup={closeAllPopup}
        />
      ))
    }
  </ul>
);

Features.defaultProps = {
  features_array: [
    {
      content: '',
      liNot: false,
      tooltip: {
        show: false,
        content: '',
      },
    },
  ],
  openPopup: () => {},
  closeAllPopup: () => {},
};

Features.propTypes = {
  features_array: PropTypes.array,
  openPopup: PropTypes.func,
  closeAllPopup: PropTypes.func,
};

export default Features;
