import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './where-sky.scss';


class TelescopeWhereSky extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      toggle: false
    };
  };



  render() {
    return(
      <div className="where-sky">
        <div className="top">
          <h3>Where in the Sky?</h3>
          <p>Zoom and pan to get a sense of where we’re pointing this thing.</p>
        </div>
        <div className="content">
          <img src={'assets/images/graphics/starfield.png'} className="main-image" />
          <img src={'assets/images/icons/icon-magnification-plus.png'} className="zoom-in" />
          <img src={'assets/images/icons/icon-magnification-minus.png'} className="zoom-out" />
          <img src={'assets/images/icons/icon-screen-view-no-text.png'} className="full-view" />
        </div>
      </div>
    );
  }
}

export default TelescopeWhereSky;
