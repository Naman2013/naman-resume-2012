import React, { Component, PropTypes } from 'react';
import TitleBar from './title-bar';

import style from './slooh-extras-tile.scss';

class SloohExtrasTile extends Component {
  render() {
    return(
      <div className={style.sloohExtrasTile}>
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
