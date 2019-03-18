import React, { Component, Fragment } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './YoutubePlayer.style';

export default class YoutubePlayer extends Component {
  static propTypes = {
    teleStreamCode: PropTypes.string.isRequired,
    clipped: PropTypes.bool,
    actions: PropTypes.shape({
      setImageDataToSnapshot: PropTypes.func.isRequired,
      resetImageToSnap: PropTypes.func.isRequired,
    }).isRequired,
    showVideoControls: PropTypes.number,
    autoPlay: PropTypes.number,
  };

  static defaultProps = {
    autoPlay: 1,
    showVideoControls: 0,
    clipped: false,
  };

  render() {
    const { teleStreamCode, clipped, autoPlay, showVideoControls } = this.props;

    const videoImageLoaderClassnames = classnames(
      'video-image-loader video-container',
      {
        clipped,
      }
    );

    return (
      <Fragment>
        <div className={videoImageLoaderClassnames}>
          <YouTube
            videoId={teleStreamCode}
            onReady={e => {
              this.player = e.target;
            }}
            opts={{
              playerVars: {
                enablejsapi: 1,
                controls: showVideoControls,
                iv_load_policy: 3,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                kb: 1,
                autoplay: autoPlay,
                playsinline: 1,
              },
            }}
          />
        </div>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}
