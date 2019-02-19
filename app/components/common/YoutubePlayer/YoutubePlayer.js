import React, { Component, Fragment } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './YoutubePlayer.style';
import YoutubePlayerOverlay from './YoutubePlayerOverlay';

export default class YoutubePlayer extends Component {
  static propTypes = {
    type: PropTypes.string,
    teleStreamCode: PropTypes.string.isRequired,
    teleStreamURL: PropTypes.string.isRequired,
    teleStreamThumbnailVideoWidth: PropTypes.string,
    teleStreamThumbnailVideoHeight: PropTypes.string,
    teleSystem: PropTypes.string,
    telePort: PropTypes.number,
    cameraSourceType: PropTypes.string,
    clipped: PropTypes.bool,
    actions: PropTypes.shape({
      setImageDataToSnapshot: PropTypes.func.isRequired,
      resetImageToSnap: PropTypes.func.isRequired,
    }).isRequired,
    showVideoControls: PropTypes.number,
    showInfo: PropTypes.number,
    callSource: PropTypes.string,
    autoPlay: PropTypes.number,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  };
  state = { isActive: false };

  generateIFrameUrl() {
    const {
      autoPlay, teleStreamCode, showVideoControls, showInfo,
    } = this.props;
    return `https://www.youtube.com/embed/${teleStreamCode}?rel=0&amp;autoplay=${autoPlay}&modestbranding=1&controls=${showVideoControls}&showinfo=${showInfo}&enablejsapi=1&vq=hd720&origin=http://live.slooh.com/`;
  }

  startVideo = () => {
    if (this.player.getPlayerState() !== 1) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  };

  render() {
    const {
      teleStreamCode,
      teleStreamThumbnailVideoWidth,
      teleStreamThumbnailVideoHeight,
      clipped,
    } = this.props;

    const videoImageLoaderClassnames = classnames('video-image-loader video-container', {
      clipped,
    });

    return (
      <Fragment>
        <div
          className={videoImageLoaderClassnames}
          onMouseOver={() => this.setState({ isActive: true })}
          onMouseLeave={() => this.setState({ isActive: false })}
        >
          {this.state.isActive &&
            (this.props.type === 'live' || (this.player && this.player.getPlayerState() !== 1)) && (
              <YoutubePlayerOverlay
                title={this.props.title}
                subtitle={this.props.subtitle}
                type={this.props.type}
                startVideo={this.startVideo}
              />
            )}
          <YouTube
            videoId={teleStreamCode}
            onReady={(e) => {
              this.player = e.target;
            }}
            opts={{
              playerVars: {
                enablejsapi: 1,
                controls: this.props.type === 'recent' ? 1 : 0,
                iv_load_policy: 3,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                kb: 1,
              },
            }}
          />
        </div>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}
