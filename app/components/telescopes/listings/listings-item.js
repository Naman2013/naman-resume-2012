import React, { Component } from 'react';
import styles from './listings.scss';

export default class ListingsItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="telescope-listings-item container">
        <div className="row">
          <div className="col-md-1 dates-column">
            <div>
                7:15 EST
                4:14 PST / 00:15 UTC
            </div>
          </div>
          <div className="col-md-4 slot-name">
            <img src="assets/icons/Jupiter.svg" width="38" alt=""/>
            <span>Jupiter</span>
          </div>
          <div className="col-md-1 reserved-by">
            reserved by:
          </div>
          <div className="col-md-1 user-avatar current-user">
            <img src="#" width="60" alt="" />
          </div>
          <div className="col-md-3 user-info">
            <div className="name">
              Dummy Name
            </div>
            <div>
              <span className="location">
                New Haven, CT, USA.
              </span>
              <span className="member-since">
                Member since 2015
              </span>
            </div>
          </div>
          <div className="col-md-2 social-bar">
            <ul className="list-inline">
              <li>
                <a href="#">f</a>
              </li>
              <li>
                <a href="#">t</a>
              </li>
              <li>
                <a href="#">g</a>
              </li>
              <li>
                <a href="#">i</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
