import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './slooh-features.scss';

class SloohFeatures extends Component {
  render() {
    return(
      <div className="col-md-4">
        <div className="slooh-features-container col-md-12">
          <img alt="Slooh account type tier" src={this.props.tierIconURL} width="50" />
          <h5 className="title" dangerouslySetInnerHTML={{ __html: this.props.tierTitle }} />
          <p className="content" dangerouslySetInnerHTML={{ __html: this.props.tierDescription }} />
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
  tierButtonText: PropTypes.string.isRequired,
};

export default SloohFeatures;
