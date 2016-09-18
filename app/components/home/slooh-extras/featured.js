import React, { Component, PropTypes } from 'react';
import SloohExtrasTile from './slooh-extras-tile';

class Featured extends Component {
  render() {
    return(
      <SloohExtrasTile title={this.props.title}>
        <div className="slooh-addon-tile">
          <h1>Hey.</h1>
        </div>
      </SloohExtrasTile>
    );
  }
}

Featured.propTypes = {
  title: PropTypes.string.isRequired
};

export default Featured;
