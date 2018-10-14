import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { ModuleContainer } from './';
import HowBig from '../../Telescope/HowBig';
import style from './how-big-module.style';

import fauxMission from 'content/fauxMissions';

class HowBigModule extends Component {
  state = {
    dimensions: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  }

  handleDimensionChange = (contentBox) => {
    this.setState({ dimensions: { ...contentBox.bounds } });
  }

  handleAnimationComplete = () => {
    console.log('Anim complete,...');
  }

  render() {
    const { dimensions: { width } } = this.state;
    return (
      <Measure
        bounds
        onResize={this.handleDimensionChange}
      >
        {
          ({ measureRef }) => (
            <ModuleContainer title="How big">
              <div
                ref={measureRef}
                className="portal"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <HowBig
                    dimension={width}
                    referenceObjectScale={fauxMission.scaleDown.referenceObjectScale}
                    domain={fauxMission.scaleDown.domain}
                    targetObjectScale={fauxMission.scaleDown.targetObjectScale}
                    targetObjectURL={fauxMission.scaleDown.targetObjectURL}
                    targetObjectName={fauxMission.scaleDown.targetObjectName}
                    onComplete={this.handleAnimationComplete}
                  />
                </svg>
              </div>

              <ul>
                <li><button>ADD BUTTONS!</button></li>
              </ul>

              <style jsx>{style}</style>
            </ModuleContainer>
          )
        }
      </Measure>
    );
  }
}

export { HowBigModule };
