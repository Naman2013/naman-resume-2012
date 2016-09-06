import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from './Menu';
import Header from './Header';
import { checkUser } from '../modules/User';

import style from './app.css';

const { element, func } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkUser }, dispatch);
}

@connect(null, mapDispatchToProps)

export default class App extends Component {
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
        <Header />
        <Menu source="nav.json" />
        <section className={style.appContentContainer}>
          {this.props.children}
        </section>
      </div>
    );
  }
}
