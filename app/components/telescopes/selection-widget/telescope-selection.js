import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './telescope-selection.scss';
export default class TelescopeSelection extends Component {


  render() {
    return (
      <div className="telescopesSelectionContainer col-md-6">

        <div className="categories">
          <ul>
            <li>
              <Link className="cat-link" to="/">Canary Island Telescopes</Link>
            </li>

            <li>
              <Link className="cat-link" to="/">Chile Telescopes</Link>
            </li>

            <li>
              <Link className="cat-link" to="/">Other Telescopes</Link>
            </li>
          </ul>
        </div>

        <div className="list">
          <ul>
            <li className="icon-container">
              <Link activeClassName="active" to="/">
                <img className="icon img-circle" src="assets/images/telescopes-selection/first.png"/>
              </Link>
            </li>

            <li className="icon-container">
              <Link activeClassName="active" to="/">
                <img className="icon img-circle" src="assets/images/telescopes-selection/second.png"/>
              </Link>
            </li>

            <li className="icon-container">
              <Link activeClassName="active" to="/">
                <img className="icon img-circle" src="assets/images/telescopes-selection/third.png"/>
              </Link>
            </li>

            <li className="icon-container">
              <Link activeClassName="active" to="/">
                <img className="icon img-circle" src="assets/images/telescopes-selection/fourth.png"/>
              </Link>
            </li>

            <li className="icon-container">
              <Link activeClassName="active" to="/">
                <img className="icon img-circle" src="assets/images/telescopes-selection/fifth.png"/>
              </Link>
            </li>

            <li className="icon-container">
              <Link activeClassName="active" to="/">
                <img className="icon img-circle" src="assets/images/telescopes-selection/sixth.png"/>
              </Link>
            </li>
          </ul>
        </div>

        <div className="description">
          <ul>
            <li className="active">
              Dummy Description here
            </li>

            <li>
              Dummy Description here
            </li>

            <li>
              Dummy Description here
            </li>

            <li>
              Dummy Description here
            </li>

            <li>
              Dummy Description here
            </li>

            <li>
              Dummy Description here
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
