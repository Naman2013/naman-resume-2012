import React, { Component, PropTypes } from 'react';
import style from './recent-video-tile.scss';

class RecentVideoTile extends Component {
  render() {
    const inlineStyle = {
      background: `url(${this.props.imageUrl}) no-repeat center center`,
      backgroundSize: 'cover',
      minHeight: '255px'
    };
    return(
      <div className="col-md-4 recent-video-tile-container">
        <div style={inlineStyle} className="recent-video-tile">
          <h4 className="title">{this.props.title}</h4>
        </div>
        <p className="content">{this.props.content}</p>
      </div>
    );
  }
}

RecentVideoTile.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrl: PropTypes.string.isRequired
};

export default RecentVideoTile;
