import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';

// import { connect } from 'react-redux';

const {
  shape,
  string,
  bool,
  number,
} = PropTypes;

class HydratedTourPopup extends Component {

  static propTypes = {
  };

  static defaultProps = {
  };


  state = {
  };

  render() {
    const {
    } = this.state;
    return (
      <div className="root">

        <style jsx>{`
          .root {
            margin: 0;
            padding: 0;
            width: 100%;
          }
        `}
        </style>
      </div>
    );
  }
}

export default HydratedTourPopup;
