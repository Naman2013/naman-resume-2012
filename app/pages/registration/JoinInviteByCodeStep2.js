/** **********************************************************************************
 * V4 Join with an Invitation Code - Collect Account Setup Information from Valid Invitation
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { createValidator, required } from 'app/modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'app/components/common/style/buttons/Button';
import JoinHeader from './partials/JoinHeader';
import JoinByInviteAccountSignup from './common/JoinByInviteAccountSignup';
import { JOIN_BY_INVITE_TABS } from './StaticNavTabs';

const { string, func } = PropTypes;

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
      clubInviteAndGiftCardDetials: window.localStorage.getItem('clubInviteAndGiftCardDetials'),
      AccountType:window.localStorage.getItem('AccountType'),

    };
  }

  render() {
    let clubInviteAndGiftCard = this.state.clubInviteAndGiftCardDetials;
    let AccountType =  this.state.AccountType;
    const { pathname } = this.props;
    const joinByInviteParams = {
      callSource: clubInviteAndGiftCard == 'SloohCard' ? 'joinByInvitationAltStep2GiftCard' : 'joinByInvitationAltStep2',
      invitationCodeAlt: this.state.invitationCodeAlt,
      inviteeEmailAddress: this.state.inviteeEmailAddress,
    };
    return (
      <JoinByInviteAccountSignup
        pathname={pathname}
        navTabs={JOIN_BY_INVITE_TABS}
        joinByInviteParams={joinByInviteParams}
        clubInviteAndGiftCardDetials={clubInviteAndGiftCard}
        AccountType={AccountType}
      />
    );


  }
}

const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

export default connect(
  mapStateToProps,
  null
)(JoinByInviteCodeStep2);
