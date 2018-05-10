import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FOVCenterMarker from './FOVCenterMarker';
import FOV from './FOV';



class FieldOfView extends Component {
  static propTypes = {
    tickSpacing: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
  };

  render() {
    const { tickSpacing, canvasWidth } = this.props;
    return (
      <g>
        <FOVCenterMarker
          tickSpacing={tickSpacing}
          canvasWidth={canvasWidth}
        />
      </g>
    );
  }
}

export default FieldOfView;
