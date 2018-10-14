import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { ModuleContainer } from './';
import HowBig from '../../Telescope/HowBig';

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
    }
  }

  handleDimensionChange = (contentBox) => {
    this.setState({ dimensions: { ...contentBox.bounds } });
  }

  handleAnimationComplete = () => {
    console.log('Anim complete,...');
  }

  render() {
    const { dimensions: { width } } = this.state;
    console.log(width);
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

              <style jsx>{`
                .portal {
                  width: 100%;
                  overflow: hidden;
                  background: none;
                  position: relative;
                  background-color: black;
                }

                .portal:before {
                  content: '';
                  padding-top: 100%;
                  float: left;
                }

                svg {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                }
              `}
              </style>
            </ModuleContainer>
          )
        }
      </Measure>
    );
  }
}

export { HowBigModule };
