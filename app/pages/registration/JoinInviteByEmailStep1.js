/** **********************************************************************************
* V4 Join with an Invitation Email which has all the necessary validation parameters
*************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import { createValidator, required } from 'modules/utils/validation';
import { browserHistory } from 'react-router';
import JoinByInviteAccountSignup from './common/JoinByInviteAccountSignup';
import styles from './JoinStep2.style';

const {
  string,
  func,
} = PropTypes;

class JoinByInviteEmailStep1 extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
  };
  static defaultProps = {
    change: noop,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { pathname } = this.props;

    const joinByInviteParams = {
      callSource: "joinByInvitationEmail",
      invitationCodeHash: this.props.params.invitationCodeHash,
      invitationCreationEpoch: this.props.params.invitationCreationEpoch,
    }

    return (
      <JoinByInviteAccountSignup joinByInviteParams={joinByInviteParams}/>
    )
  }
}


const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

export default connect(mapStateToProps, null)(JoinByInviteEmailStep1);
