import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import Feature from './feature';

const Features = ({ features_array, openPopup, closeAllPopup, actNowButtonSingletonCSS, featureSingletonCSS }) => (
  <ul className="features" style={featureSingletonCSS}>
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
          actNowButtonSingletonCSS={actNowButtonSingletonCSS}
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
  actNowButtonSingletonCSS: {},
  featureSingletonCSS: {},
};

Features.propTypes = {
  features_array: PropTypes.array,
  openPopup: PropTypes.func,
  closeAllPopup: PropTypes.func,
  actNowButtonSingletonCSS: PropTypes.object,
  featureSingletonCSS: PropTypes.object,
};

export default Features;
