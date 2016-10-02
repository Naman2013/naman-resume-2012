import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Tips extends Component {


  render() {
    return (
      <div className="tips">
        <span>
          TIP:
        </span>
        <span>
          You can see all of your existing reservations
          on your
          <Link to="/">Profile page</Link>.
        </span>
      </div>
    );
  }
}
