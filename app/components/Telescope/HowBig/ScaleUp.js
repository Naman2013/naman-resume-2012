import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import domains from './domains';
import FadeSVG from '../../../components/common/Fade/FadeSVG';
import { animateValues } from '../../../utils/easingFunctions';

class ScaleUp extends Component {
  static BEFORE_START = 1000;

  static propTypes = {
    dimension: PropTypes.number,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectScale: PropTypes.number.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    referenceObject: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    dimension: 500,
    onComplete: noop,
  };

  state = {
    referenceObjectLoaded: false,
    showReference: false,
    referenceScale: 1,
    referencePosition: {
      x: 0,
      y: 0,
    },
  };

  componentDidMount() {
    this.beginDelayToShowReference();
  }

  componentWillUnmount() {
    clearTimeout(this.timerDelayPresentReference);
  }

  handleReferenceObjectLoaded = () => {
    this.setState({ referenceObjectLoaded: true });
  }

  beginDelayToShowReference() {
    setTimeout(() => {
      this.presentReference();
    }, ScaleUp.BEFORE_START);
  }

  presentReference() {
    this.setState({ showReference: true });
  }

  timerDelayPresentReference = undefined;

  render() {
    const { referenceObject, dimension } = this.props;
    const { showReference, referenceObjectLoaded } = this.state;

    const displayReferenceObject = (showReference && referenceObjectLoaded);
    const artworkDimension = (dimension * 0.8);
    const middlePoint = (dimension / 2);
    const artworkPosition = (middlePoint - (artworkDimension / 2));

    return (
      <g>
        <FadeSVG isHidden={!(displayReferenceObject)}>
          {
            domains
              .enumValueOf(referenceObject)
              .render({
                width: artworkDimension,
                height: artworkDimension,
                x: artworkPosition,
                y: artworkPosition,
                onLoadCallback: this.handleReferenceObjectLoaded,
              })
          }
        </FadeSVG>
      </g>
    );
  }
}

export default ScaleUp;
