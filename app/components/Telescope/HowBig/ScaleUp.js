import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import domains from './domains';
import FadeSVG from '../../../components/common/Fade/FadeSVG';
import easingFunctions, { animateValues } from '../../../utils/easingFunctions';

class ScaleUp extends Component {
  static BEFORE_START = 1000;
  static PAUSE_BEFORE_SCALING_REFERENCE = 2000;
  static DURATION_OF_SCALE_DOWN_REFERENCE = 500;
  static PAUSE_BEFORE_MOVING_REFERENCE = 1000;
  static DURACTION_TO_MOVE_REFERENCE = 1000;

  static propTypes = {
    dimension: PropTypes.number,
    targetObjectURL: PropTypes.string.isRequired,
    targetObjectName: PropTypes.string.isRequired,
    referenceObject: PropTypes.string.isRequired,
    referenceObjectScale: PropTypes.number.isRequired,
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
    clearTimeout(this.timerDelayScaleReference);
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
    this.timerDelayScaleReference = setTimeout(() => {
      this.scaleReference();
    }, ScaleUp.PAUSE_BEFORE_SCALING_REFERENCE);
  }

  scaleReference() {
    animateValues({
      referenceScale: this.state.referenceScale,
    }, ScaleUp.DURATION_OF_SCALE_DOWN_REFERENCE, {
      referenceScale: this.props.referenceObjectScale,
      onUpdate: ({ referenceScale }) => {
        this.setState(() => ({ referenceScale }));
      },
      onComplete: () => {
        this.prepareToAnimateReferenceLocation();
      },
      ease: easingFunctions.easeInOutQuad,
    });
  }

  prepareToAnimateReferenceLocation() {
    this.timerDelayToAnimateReference = setTimeout(() => {
      this.animateMoveReference();
    }, ScaleUp.PAUSE_BEFORE_MOVING_REFERENCE);
  }

  animateMoveReference() {
    // TODO: animate the location of the reference to the top left most area...
  }

  timerDelayPresentReference = undefined;
  timerDelayScaleReference = undefined;

  render() {
    const { referenceObject, dimension } = this.props;
    const { showReference, referenceObjectLoaded, referenceScale } = this.state;

    const displayReferenceObject = (showReference && referenceObjectLoaded);
    const artworkDimension = (dimension * 0.8);
    const middlePoint = (dimension / 2);
    const artworkPosition = (middlePoint - (artworkDimension / 2));

    return (
      <g style={{
          transform: `scale(${referenceScale})`,
          transformOrigin: 'center',
        }}
      >
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
