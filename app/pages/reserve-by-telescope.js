import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import classnames from 'classnames';

import {missionGetCards, missionConfirmOpen, missionConfirmClose} from '../modules/Missions';

import TelescopeSelection from '../components/telescopes/selection-widget/telescope-selection';
import CurrentSelectionHeader from '../components/telescopes/current-selection-header/header';


const { element, func, object } = PropTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetCards,
      missionConfirmOpen,
      missionConfirmClose
    }, dispatch)
  };
}

function mapStateToProps({ missions }) {
  return {
    missions,
    cardList: missions.cardList || []
  };
}

@connect(mapStateToProps, mapDispatchToProps)

export default class ReserveMissions extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    children: element,
    actions: object.isRequired
  };

  render() {
    let cardClassName = classnames({
      'mission-card': true,
      'featured': true
    });

    return (
      <div className="reserve-by-telescope container">
        <TelescopeSelection />
        <CurrentSelectionHeader />
        <section className="clearfix">
        
        </section>
      </div>
    );
  }
}
