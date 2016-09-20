import React, { Component } from 'react';

export default class MenuSocial extends Component {
  render() {
    return (
      <div>
        <h3>Find Us On Social Media</h3>
        <div className="menu-social-icons">
          <a><img className="menu-social" src="assets/images/nav/social-facebook.png" /></a>
          <a><img className="menu-social" src="assets/images/nav/social-twitter.png" /></a>
          <a><img className="menu-social" src="assets/images/nav/social-googleplus.png" /></a>
          <a><img className="menu-social" src="assets/images/nav/social-instagram.png" /></a>
          <a><img className="menu-social" src="assets/images/nav/social-youtube.png" /></a>
        </div>
      </div>
    );
  }
}
