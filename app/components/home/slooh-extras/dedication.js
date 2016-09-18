import React, { Component, PropTypes } from 'react';
import SloohExtrasTile from './slooh-extras-tile';

class Dedication extends Component {
  render() {
    return(
      <SloohExtrasTile title={this.props.title}>
        <div>
          <h1>Foo!</h1>
        </div>
      </SloohExtrasTile>
    );
  }
}

Dedication.propTypes = {
  title: PropTypes.string.isRequired
};

export default Dedication;
