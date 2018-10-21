/** **********************************************************************************
* V4 Join with an Invitation Code - Collect Account Setup Information from Valid Invitation
*************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import Request from 'components/common/network/Request';
import JoinHeader from './partials/JoinHeader';

import {
  JOIN_PAGE_ENDPOINT_URL,
} from 'services/registration/registration.js';
import styles from './JoinStep2.style';

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

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = (result) => {
  }

  render() {
    const { pathname } = this.props;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ 'callSource': 'joinByInvitationAltStep2', invitationCodeAlt: this.state.invitationCodeAlt, inviteeEmailAddress: this.state.inviteeEmailAddress }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({
            fetchingContent,
            serviceResponse: joinPageRes,
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                    <JoinHeader
                      mainHeading={joinPageRes.pageHeading1}
                      subHeading={joinPageRes.pageHeading2}
                      activeTab={pathname}
                    />
                    <div className="step-root">
                      <div className="inner-container">
                        <div className="section-heading">{joinPageRes.sectionHeading}</div>
                      </div>
                    </div>
                  </Fragment>
                }
                </Fragment>
              )}
            />
          <style jsx>{styles}</style>
      </div>
    )
  }
}


const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinAccountForm', enableReinitialize: true, })(JoinByInviteCodeStep2));
