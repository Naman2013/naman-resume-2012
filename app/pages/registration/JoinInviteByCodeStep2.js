/** **********************************************************************************
* V4 Join with an Invitation Code - Collect Account Setup Information from Valid Invitation
*************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { createValidator, required } from 'modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import JoinHeader from './partials/JoinHeader';
import JoinByInviteAccountSignup from './common/JoinByInviteAccountSignup';

const {
  string,
  func,
} = PropTypes;

class JoinByInviteCodeStep2 extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
  };
  static defaultProps = {
    change: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      invitationCodeAlt: window.localStorage.getItem('invitationCodeAlt'),
      inviteeEmailAddress: window.localStorage.getItem('inviteeEmailAddress'),
    }
  }

  render() {
    const { pathname } = this.props;

    const joinByInviteParams = {
      callSource: 'joinByInvitationAltStep2',
      invitationCodeAlt: this.state.invitationCodeAlt,
      inviteeEmailAddress: this.state.inviteeEmailAddress
    };

    const numSteps = 2;
    const stepNumber = 2;

    return (
      <JoinByInviteAccountSignup pathname="/join/inviteByCodeStep2" stepNumber={stepNumber} numberOfSteps={numSteps} joinByInviteParams={joinByInviteParams}/>
    )
  }
}


const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

export default connect(mapStateToProps, null)(JoinByInviteCodeStep2);
