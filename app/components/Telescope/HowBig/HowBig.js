import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGText from '../common/SVGText';
import AutoFadeSVG from '../../common/Fade/AutoFadeSVG';
import ScaleUp from './ScaleUp';
import ScaleDown from './ScaleDown';

class HowBig extends Component {
  static propTypes = {
    dimension: PropTypes.number.isRequired,
    referenceObjectScale: PropTypes.number.isRequired,
    domain: PropTypes.string.isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  changeTitle = title => {
    this.setState({ title });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.isStart) {
      this.setState({ title: '' })
    }
  }

  render() {
    const {
      dimension,
      referenceObjectScale,
      targetObjectScale,
      isStart,
    } = this.props;
    const { title } = this.state;

    const isScaledUp = targetObjectScale > referenceObjectScale;
    const titleFontSize = dimension * 0.04;

    return (
      <g>
        {isStart ? (
          isScaledUp ? (
            <ScaleUp {...this.props} changeTitle={this.changeTitle} />
          ) : (
              <ScaleDown {...this.props} changeTitle={this.changeTitle} />
            )
        ) : (
            <div />
          )}

        <AutoFadeSVG duration={0.5}>
          <SVGText
            text={title}
            x={dimension / 2}
            y={dimension * 0.07}
            displayProperties={{
              fontSize: `${titleFontSize}px`,
            }}
          />
        </AutoFadeSVG>
      </g>
    );
  }
}

export default HowBig;
