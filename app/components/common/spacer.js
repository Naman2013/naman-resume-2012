import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Spacer extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    let divStyle = {
      height: this.props.height
    };
    return(
      <div style={divStyle}>
      </div>
    );
  }
}

export default Spacer;
