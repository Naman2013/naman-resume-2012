import React, { Component, PropTypes } from 'react';
import TitleBar from './title-bar';

class SloohExtrasTile extends Component {
  render() {
    return(
      <div className="slooh-extras-tile">
        <TitleBar title={this.props.title} />
        {this.props.children}
      </div>
    );
  }
}

SloohExtrasTile.propTypes = {
  title: PropTypes.string.isRequired
};

export default SloohExtrasTile;
