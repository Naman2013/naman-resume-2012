import React, { Component, PropTypes } from 'react';
import TitleBar from './title-bar';

import style from './slooh-extras-tile.scss';

class SloohExtrasTile extends Component {
  render() {
    return(
      <div className="slooh-extras-tile col-md-4">
        <div className="slooh-extras-content">
          <TitleBar title={this.props.title} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

SloohExtrasTile.propTypes = {
  title: PropTypes.string.isRequired
};

export default SloohExtrasTile;
