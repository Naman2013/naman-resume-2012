import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './YoutubePlayerOverlay.style';
import ReadingListButton from '../style/buttons/ReadingListButton';
import Button from '../style/buttons/Button';

export default class YoutubePlayerOverlay extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  };

  state = {
    show: true,
  };

  startVideo = () => {
    this.props.startVideo();
  };

  render() {
    return (
      <Fragment>
        <div className="overlay-container">
          {this.props.type !== 'live' && (
            <Fragment>
              <div className="subtitle"> {this.props.subtitle} </div>
              <div className="title">{this.props.title}</div>
            </Fragment>
          )}
          <div className="buttons-main">
            <ReadingListButton icon="https://vega.slooh.com/assets/v4/common/plus_icon.svg" />
            {(this.props.type === 'recent' || this.props.type === 'live') && (
              <Button
                icon="https://vega.slooh.com/assets/v4/icons/play_icon.svg"
                onClickEvent={this.props.startVideo}
              />
            )}
          </div>
          {this.props.type === 'live' && (
            <div className="buttons-live">
              <Button text="LARGE VIEW" />
              <Button text="FULL SCREEN" />
            </div>
          )}
        </div>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}
