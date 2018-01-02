import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './recent-video-tile.scss';

class RecentVideoTile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVideoPlay: false,
    };
  }

  playVideo() {
    this.setState({
      isVideoPlay: true,
    });
  }

  generateVideoDescription() {
    if (this.props.contentLink != '') {
      if (this.props.openInNewTab == false) {
        return (
          <a style={this.inlineStyle_VideoDescription} className="content contentlink" href={this.props.contentLink} dangerouslySetInnerHTML={{ __html: this.props.content }} />
        )
      }
      else {
        return (
          <a target="_blank" style={this.inlineStyle_VideoDescription} className="content contentlink" href={this.props.contentLink} dangerouslySetInnerHTML={{ __html: this.props.content }} />
        )
      }
    }
    else {
      return (
        <p style={this.inlineStyle_VideoDescription} className="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
      )
    }
  }

  render() {
    /* calulate the width of each video */
    var videoWidth = '';

    if (this.props.numVideos == 1) {
      /* only set the width a maximum of 50% if there is one video */
      videoWidth = '50%';
    }
    else {
      videoWidth = 100 / this.props.numVideos + '%';
    }


    const inlineStyle = {
      background: `url(${this.props.imageUrl}) no-repeat center center`,
      backgroundSize: 'cover',
      minHeight: '255px',
      minWidth: `${videoWidth}`,
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '20px',
    };

    const inlineStyle_video = {
      minWidth: '100%',
      width: '100%',
    };

    const inlineStyle_VideoDescription = {
      textAlign: 'left',
    }

    return (
      <div style={inlineStyle} className="col-sm-4 recent-video-tile-container">
        <div style={inlineStyle_video} className="video-wrap">
          <iframe
            className="home-youtube-video"
            width="100%"
            src={this.props.videoURL}
            seamless
            allowFullScreen
            autoPlay="1"
            frameBorder="0"
          />
        </div>
        {this.generateVideoDescription()}

        <style>{`
            .contentlink:hover {
              text-decoration: none;
            }

            .contentlink:visited {
              text-decoration: none;
            }

            .contentlink:active {
              text-decoration: none;
            }

            .contentlink:focus {
              text-decoration: none;
            }
        `}
        </style>
      </div>
    );
  }
}

// var setAnchor = () => {
//   return{__html: <a href={this.props.content_link}>{this.props.content}</a> }
// }
// <a href={this.props.content_link}>{this.props.content}</a>
// dangerouslySetInnerHTML={__html:{<a href={this.props.content_link}></a>}}>{this.props.content}</p>
RecentVideoTile.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

export default RecentVideoTile;
