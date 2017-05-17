import React, { Component, PropTypes } from 'react';
import style from './slooh-features.scss';

class SloohFeatures extends Component {
  render() {
    return(
      <div className="col-md-4">
        <div className="slooh-features-container col-md-12">
          <img src={this.props.tierIconURL} width="50" />
          <h5 className="title">{this.props.tierTitle}</h5>
          <p className="content">{this.props.tierDescription}</p>
          <a className="action" href={this.props.tierButtonURL}>{this.props.tierButtonText}</a>
        </div>
      </div>
    );
  }
}

SloohFeatures.propTypes = {
  tierIconURL: PropTypes.string.isRequired,
  tierTitle: PropTypes.string.isRequired,
  tierDescription: PropTypes.string.isRequired,
  tierButtonURL: PropTypes.string.isRequired,
  tierButtonText: PropTypes.string.isRequired
};

export default SloohFeatures;
