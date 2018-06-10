import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import FadeSVG from 'components/common/Fade/FadeSVG';
import domains from './domains';

class ScaleDown extends Component {
  static propTypes = {
    referenceObject: PropTypes.oneOf([
      'SOLAR_SYSTEM',
      'STAR',
      'MILKY_WAY',
      'DEEP_SPACE',
    ]).isRequired,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

  state = {
    targetCurrentScale: 1,
  };

  render() {
    const {
      referenceObject,
      targetObjectURL,
      dimension,
    } = this.props;

    const { targetCurrentScale } = this.state;

    return (
      <g>
        {domains.enumValueOf(referenceObject).render()}
        <ObjectFrame />
      </g>
    );
  }
}

export default ScaleDown;
