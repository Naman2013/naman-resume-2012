import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { styles } from './YoutubePlayer.style';

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
    }
    state = { isActive: false }


    generateIFrameUrl() {
        const {
            autoPlay, teleStreamCode, showVideoControls, showInfo,
        } = this.props;
        return `https://www.youtube.com/embed/${teleStreamCode}?rel=0&amp;autoplay=${autoPlay}&modestbranding=1&controls=${showVideoControls}&showinfo=${showInfo}&vq=hd720&origin=http://live.slooh.com/`;
    }



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
                <div >
                    <iframe
                        title="player"
                        id={teleStreamCode}
                        className="video-iframe"
                        type="text/html"
                        width={teleStreamThumbnailVideoWidth}
                        height={teleStreamThumbnailVideoHeight}
                        src={this.generateIFrameUrl()}
                        frameBorder="0"
                    />
                </div>
                <style jsx>{styles}</style>
            </Fragment>
        );
    }
}