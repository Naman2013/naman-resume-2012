import React, { Component, PropTypes } from 'react';
import style from './recent-video-tile.scss';

class RecentVideoTile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVideoPlay: false
    }
  }

  playVideo() {
    this.setState({
      isVideoPlay: true
    })
  }

  render() {
    const inlineStyle = {
      background: `url(${this.props.imageUrl}) no-repeat center center`,
      backgroundSize: 'cover',
      minHeight: '255px'
    };

    const cover = () => {
      return <div>
          <div style={inlineStyle} className="recent-video-tile">
            <h4 className="title">{this.props.title}</h4>
          </div>
        </div>
    }

    return(
      <div className="col-md-4 recent-video-tile-container">
        <div className="video-wrap">
          <iframe className="home-youtube-video" width="100%" src={this.props.videoUrl} seamless allowFullScreen autoPlay="1" frameBorder="0"></iframe>
        </div>
        <p className="content"><a href={this.props.content_link}>{this.props.content}</a></p>
      </div>
    );
  }
}

RecentVideoTile.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired
};

export default RecentVideoTile;
