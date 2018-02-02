import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { black } from '../../../styles/variables/colors';

class Transition extends Component {
  static propTypes = {
    height: PropTypes.string.isRequired,
    minHeight: PropTypes.number,
    handleOnEnded: PropTypes.func.isRequired,
  };

  static defaultProps = {
    minHeight: 500,
  };

  componentWillReceiveProps() {
    this.playerHandle.currentTime = 0;
    this.playerHandle.play();
  }

  render() {
    const {
      height,
      minHeight,
      handleOnEnded,
    } = this.props;

    const dimensionStyle = {
      height: (height) ? `${height}px` : `${minHeight}px`,
    };

    return (
      <div className="root" style={dimensionStyle}>
        <video
          ref={(player) => { this.playerHandle = player; }}
          onEnded={handleOnEnded}
          className="transition-video"
          playsInline
          muted
        >
          <source src="https://vega.slooh.com/video/home/stars-high-720.webm" type="video/webm" />
          <source src="https://vega.slooh.com/video/home/stars-high-720.mp4" type="video/mp4" />
        </video>

        <style jsx>{`
          .root {
            width: 100%;
            background: ${black};
            position: absolute;
            overflow: hidden;
          }

          .transition-video {
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        `}</style>
      </div>
    );
  }
}

export default Transition;
