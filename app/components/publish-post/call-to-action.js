import React, { Component } from 'react';
import style from './call-to-action.scss';

class CallToAction extends Component {
  render() {
    return (
      <div className="call-to-action-wrapper">
        <div className="header text-center">
          Publish a post

          <button className="btn cancel-btn" type="button">Cancel this</button>
        </div>
      </div>
    )
  }
}

export default CallToAction;
