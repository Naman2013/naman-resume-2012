import React, { Component } from 'react';

export default function SocialBar({ something }) {
  return (
    <div className="col-md-2 social-bar">
      <ul className="list-inline">
        <li>
          <a href="#">
            <img src="assets/icons/facebook_logo.png" width="24" alt=""/>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="assets/icons/twitter_logo.png" width="24" alt=""/>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="assets/icons/google_plus_logo.png" width="24" alt=""/>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="assets/icons/instagram_logo.png" width="24" alt=""/>
          </a>
        </li>
      </ul>
    </div>
  );
}

