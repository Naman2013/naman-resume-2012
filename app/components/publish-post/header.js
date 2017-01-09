import React, { Component } from 'react';
import style from './call-to-action.scss';

class Header extends Component {
  render() {
    return (
      <div className="call-to-action-wrapper">
        <div className="header text-center">
          <h1 className="title">Publish a post</h1>
          <button className="btn-primary cancel-btn" type="button">Cancel This</button>
        </div>
      </div>
    )
  }
}

export default Header;
