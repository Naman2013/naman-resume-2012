import React, { Component, PropTypes } from 'react';

class BestOfSlooh extends Component {
  render() {
    return(
      <div className="">
        Best of Slooh...
      </div>
    );
  }
}

BestOfSlooh.propTypes = {
  blogPosts: PropTypes.array,
};

export default BestOfSlooh;
