import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId'

import Feature from './feature';

/*
  TODO: build feature component and features iterator component
  <Features features=[
    { title: 'Shows: All', tooltip: {show: true, content: 'whatever'} },
    {  }]
  />
    // iterates over list of props in 'features' and generates a <Feature> for each
    <Feature
      showTooltip={feature.tooltip}
      />
*/

class Features extends Component {

  render() {
    return (
      <ul className="features" key={uniqueId('features_')}>
        {
          this.props.features_array.map((feature) => {
            return (
              <Feature
                content={feature.content}
                id={feature.id}
                tooltip={feature.tooltip}
                liNot={feature.liNot}
                openPopup={this.props.openPopup}
                closePopup={this.props.closeAllPopup}
              />
            );
          },
      )}
      </ul>
    );
  }
}


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
