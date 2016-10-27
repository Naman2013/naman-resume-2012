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

    const video = () => {
      return (
        <iframe width="405" height="255" src={this.props.videoUrl} seamless allowFullScreen autoPlay="1"></iframe>
      )
    }

    return(
      <div className="col-md-4 recent-video-tile-container" onClick={this.playVideo.bind(this)}>        
        {this.state.isVideoPlay ? video() : cover() }
        <p className="content">{this.props.content}</p>
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
