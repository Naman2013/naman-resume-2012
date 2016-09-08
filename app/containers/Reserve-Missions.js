import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';

const { element, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkUser }, dispatch);
}

@connect(null, mapDispatchToProps)

export default class ReserveMissions extends Component {
  static propTypes = {
    children: element,
    checkUser: func.isRequired,
  };

  componentDidMount() {
    this.props.checkUser();
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2>Reserve Mission</h2>
          <p>Universal Time: 01:26:42 What is UTC</p>
        </div>

        <div className="row missions-sub-nav">
          <ul>
            <li className=""><a href="/reserve/missions">Slooh Recommends</a></li>
            <li className="#"><a href="/">By List</a></li>
            <li className="#"><a href="/">By Catalog</a></li>
            <li className="#"><a href="/">By Coordinates</a></li>
            <li className="#"><a href="/">By Telescope</a></li>
            <li className="#"><a href="/">Advanced Scheduling</a></li>
          </ul>
        </div>

        <section className="app-content-container clearfix">
          {this.props.children}
        </section>
      </div>
    );
  }
}
