import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import noop from 'lodash/noop';
import DefaultButton from 'app/components/common/style/buttons/Button';
import HowBig from 'app/components/Telescope/HowBig';
import fauxMission from 'content/fauxMissions';
import {browserHistory } from 'react-router';
import { ModuleContainer } from './index';
import style from './how-big-module.style';

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
      isStarted: this.props.autoplay,
    },
  };

  handleDimensionChange = contentBox => {
    this.setState({ dimensions: { ...contentBox.bounds } });
  };

  handleAnimationComplete = () => {
    console.log('Anim complete,...');
    this.setState({ isStarted: false });
  };

  render() {
    const {
      dimensions: { width },
      isStarted,
    } = this.state;
    const { autoplay } = this.props;
    return (
      <Measure bounds onResize={this.handleDimensionChange}>
        {({ measureRef }) => (
          <ModuleContainer title={this.props.howBigLabel}>
            <div ref={measureRef} className="portal">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <HowBig dimension={width} {...this.props} isStart={isStarted} />
              </svg>
            </div>

            {this.props.showInfoText && <p>{this.props.infoText}</p>}

            <ul className="tile-actions">
              <li>
                <DefaultButton
                  theme={{ width: '100%' }}
                  text="View our guide"
                  onClickEvent={() => browserHistory.push(this.props.guideURL)}
                />
              </li>
              {!autoplay && (
                <li>
                  <DefaultButton
                    theme={{ width: '100%' }}
                    text={this.props.playButtonCaption}
                    onClickEvent={() => this.setState({ isStarted: true })}
                  />
                </li>
              )}
            </ul>

            <style jsx>{style}</style>
          </ModuleContainer>
        )}
      </Measure>
    );
  }
}

const { string, func, number, bool } = PropTypes;

HowBigModule.propTypes = {
  referenceObjectScale: number,
  targetObjectScale: number,
  targetObjectURL: string,
  targetObjectName: string,
  domain: string,
  onComplete: func,
  autoplay: bool,
};

HowBigModule.defaultProps = {
  referenceObjectScale: fauxMission.scaleDown.referenceObjectScale,
  domain: fauxMission.scaleDown.domain,
  targetObjectScale: fauxMission.scaleDown.targetObjectScale,
  targetObjectURL: fauxMission.scaleDown.targetObjectURL,
  targetObjectName: fauxMission.scaleDown.targetObjectName,
  onComplete: noop,
  autoplay: true,
};

export { HowBigModule };
