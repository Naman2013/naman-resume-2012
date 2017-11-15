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

  render() {
    const inlineStyle = {
      background: `url(${this.props.imageUrl}) no-repeat center center`,
      backgroundSize: 'cover',
      minHeight: '255px',
      paddingLeft: '20px',
      paddingRight: '20px',
    };

    return (
      <div style={inlineStyle} className="col-sm-4 recent-video-tile-container">
        <div className="video-wrap">
          <iframe
            className="home-youtube-video"
            width="100%"
            src={this.props.embedURL + "/" + this.props.embedCode}
            seamless
            allowFullScreen
            autoPlay="1"
            frameBorder="0"
          />
        </div>
        <p className="content" dangerouslySetInnerHTML={{ __html: this.props.embedDescription }} />
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
