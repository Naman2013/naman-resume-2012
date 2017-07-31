import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SloohExtrasTile from './slooh-extras-tile';

class TwitterFeed extends Component {
  render() {
    return(
      <SloohExtrasTile title={this.props.title}>
        <div className="slooh-addon-tile">
          <h1>Twitter feed...</h1>
        </div>
      </SloohExtrasTile>
    );
  }
}

TwitterFeed.propTypes = {
  title: PropTypes.string.isRequired
};

export default TwitterFeed;
