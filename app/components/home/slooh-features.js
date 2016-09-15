import React, { Component, PropTypes } from 'react';
import style from './slooh-features.scss';

class SloohFeatures extends Component {
  render() {
    return(
      <div className="col-md-4">
        <div className="slooh-features-container col-md-12">
          <img src={this.props.icon} width="50" />
          <h5 className="title">{this.props.title}</h5>
          <p className="content">{this.props.content}</p>
          <a className="action" href={this.props.actionUrl}>{this.props.actionText}</a>
        </div>
      </div>
    );
  }
}

SloohFeatures.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  actionUrl: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired
};

export default SloohFeatures;
