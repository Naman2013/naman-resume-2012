/********************************************************************
* V4 Common Discussions Board - Classroom/Astronomy Club Invitations
********************************************************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { DeviceContext } from 'providers/DeviceProvider';
import TextareaField from 'components/form/TextareaField';
import Button from 'components/common/style/buttons/Button';
import { CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL } from 'services/classroom/classroom';
import { CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL } from 'services/registration/registration';
import Request from 'components/common/network/Request';
import axios from 'axios';
import {
  screenMedium,
  screenLarge,
} from 'styles/variables/breakpoints';
import styles from './DiscussionBoardInviteNewMemberToSlooh.style';

const {
  any,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class DiscussionBoardInviteNewMemberToSlooh extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inEditMode: false,
      inviteFormDetails: {
        firstName: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },
        lastName: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },
        emailAddress: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },
        emailAddressVerification: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },      }
    }
  }

  static propTypes = {
    discussionGroupId: string,
    newInvitationComplete: func.isRequired,
  };

  static defaultProps = {
    discussionGroupId: null,
  };

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleInvitationPanelServiceResponse = (result) => {
    const inviteFormData = cloneDeep(this.state.inviteFormDetails);

    inviteFormData.firstName.label = result.formfields.firstname.label;
    inviteFormData.lastName.label = result.formfields.lastname.label;
    inviteFormData.emailAddress.label = result.formfields.emailaddress.label;
    inviteFormData.emailAddressVerification.label = result.formfields.emailaddressverification.label;

    inviteFormData.firstName.hintText = result.formfields.firstname.hintText;
    inviteFormData.lastName.hintText = result.formfields.lastname.hintText;
    inviteFormData.emailAddress.hintText = result.formfields.emailaddress.hintText;
    inviteFormData.emailAddressVerification.hintText = result.formfields.emailaddressverification.hintText;

    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      inviteFormDetails: inviteFormData,
    }));
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the invite form, modify it and re-set the state */
    const inviteFormData = cloneDeep(this.state.inviteFormDetails);
    inviteFormData[field].value = value;

    this.setState(() => ({
      inviteFormDetails: inviteFormData,
    }));
  }

  /* Submit the Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    const { discussionGroupId, user } = this.props;
    formValues.preventDefault();

    const inviteFormData = cloneDeep(this.state.inviteFormDetails);

    var isFormComplete = true;

    if (this.state.inviteFormDetails.firstName.value === '') {
      isFormComplete = false;
      inviteFormData.firstName.errorText = 'Please provide a First Name';

    }

    if (this.state.inviteFormDetails.lastName.value === '') {
      isFormComplete = false;
      inviteFormData.lastName.errorText = 'Please provide a Last Name';

    }

    if (this.state.inviteFormDetails.emailAddress.value === '') {
      isFormComplete = false;
      inviteFormData.emailAddress.errorText = 'Please provide an Email Address';
    }
    else {
      if (this.state.inviteFormDetails.emailAddressVerification.value === '') {
        isFormComplete = false;
        inviteFormData.emailAddressVerification.errorText = 'Please confirm the Email Address';
      }
      else {
        //check to make sure the email address and email address verification fields matches
        if (this.state.inviteFormDetails.emailAddress.value != this.state.inviteFormDetails.emailAddressVerification.value) {
          isFormComplete = false;
          inviteFormData.emailAddressVerification.errorText = 'The Email Address and the Email Verification fields must match.';
        }
      }

    }

    if (isFormComplete === true) {
      const setGroupDescriptionResult = axios.post(CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL, {
        cid: user.cid,
        at: user.at,
        token: user.token,
        groupId: discussionGroupId,
        inviteeDetails: {
          firstName: this.state.inviteFormDetails.firstName.value,
          lastName: this.state.inviteFormDetails.lastName.value,
          emailAddress: this.state.inviteFormDetails.emailAddress.value,
        }
      })
        .then((response) => {
          const res = response.data;
          if (res.apiError == false) {
            //the invitation was successful, reset the form....

            const inviteFormData = cloneDeep(this.state.inviteFormDetails);
            inviteFormData.firstName.value = '';
            inviteFormData.lastName.value = '';
            inviteFormData.emailAddress.value = '';
            inviteFormData.emailAddressVerification.value = '';

            inviteFormData.firstName.errorText = '';
            inviteFormData.lastName.errorText = '';
            inviteFormData.emailAddress.errorText = '';
            inviteFormData.emailAddressVerification.errorText = '';

            /* update the form details and reset the form fields */
            this.setState(() => ({
              inviteFormDetails: inviteFormData,
            }));

            //Tell the Parent Invitation Component to close this form and re-fire the Request object to retrieve the latest invitation status/details.
            this.props.newInvitationComplete();
          }
        })
        .catch((err) => {
          throw ('Error: ', err);
        });
    }
    else {
      //update the form data for any error text, etc.
      this.setState(() => ({
        inviteFormDetails: inviteFormData,
      }));
    }
  }

  render() {

    const {
      discussionGroupId,
      user,
    } = this.props;

    const {
      inviteFormDetails
    } = this.state;

    return (
      <div className="groups-header-information">
        <Request
          serviceURL={CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL}
          requestBody={{ cid: user.cid, at: user.at, token: user.token, groupId: discussionGroupId }}
          serviceResponseHandler={this.handleInvitationPanelServiceResponse}
          render={({
            fetchingContent,
            serviceResponse,
          }) => (
            <Fragment>
              {
                !fetchingContent && <Fragment>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-section">
                      <div className="form-field-container">
                        <h2>{serviceResponse.formHeading1}</h2>
                        <h3>{serviceResponse.formHeading2}</h3>
                        <div className="form-section split">
                          <div className="form-field-container form-field-half">
                              <span className="form-label" dangerouslySetInnerHTML={{ __html: inviteFormDetails.firstName.label }} />:
                              <span className="form-error" dangerouslySetInnerHTML={{ __html: inviteFormDetails.firstName.errorText }} />
                              <Field
                                name="firstName"
                                component={InputField}
                                label={this.state.inviteFormDetails.firstName.hintText}
                                value={this.state.inviteFormDetails.firstName.value}
                                onChange={(event) => { this.handleFieldChange({ field: 'firstName', value: event.target.value }); }}
                              />
                            </div>
                            <div className="form-field-container form-field-half">
                              <span className="form-label" dangerouslySetInnerHTML={{ __html: inviteFormDetails.lastName.label }} />:
                              <span className="form-error" dangerouslySetInnerHTML={{ __html: inviteFormDetails.lastName.errorText }} />
                              <Field
                                name="lastName"
                                component={InputField}
                                label={this.state.inviteFormDetails.lastName.hintText}
                                value={this.state.inviteFormDetails.lastName.value}
                                onChange={(event) => { this.handleFieldChange({ field: 'lastName', value: event.target.value }); }}
                              />
                          </div>
                        </div>
                        <div className="form-section">
                          <div className="form-field-container">
                            <span className="form-label" dangerouslySetInnerHTML={{ __html: inviteFormDetails.emailAddress.label }} />:
                            <span className="form-error" dangerouslySetInnerHTML={{ __html: inviteFormDetails.emailAddress.errorText }} />
                            <Field
                              name="emailAddress"
                              component={InputField}
                              label={this.state.inviteFormDetails.emailAddress.hintText}
                              value={this.state.inviteFormDetails.emailAddress.value}
                              onChange={(event) => { this.handleFieldChange({ field: 'emailAddress', value: event.target.value }); }}
                            />
                          </div>
                          <div className="form-field-container">
                            <span className="form-label" dangerouslySetInnerHTML={{ __html: inviteFormDetails.emailAddressVerification.label }} />:
                            <span className="form-error" dangerouslySetInnerHTML={{ __html: inviteFormDetails.emailAddressVerification.errorText }} />
                            <Field
                              name="emailAddressVerification"
                              component={InputField}
                              label={this.state.inviteFormDetails.emailAddressVerification.hintText}
                              value={this.state.inviteFormDetails.emailAddressVerification.value}
                              onChange={(event) => { this.handleFieldChange({ field: 'emailAddressVerification', value: event.target.value }); }}
                            />
                          </div>
                        </div>
                        <div className="button-actions">
                          <Button
                            className="submit-button"
                            type="submit"
                            onClickEvent={this.handleSubmit}
                            text="Send Invitation"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <br/>
                </Fragment>
              }
            </Fragment>
          )}
          />

        <style jsx>{`
          .button-actions {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }

          .submit-button {

          }

          @media ${screenLarge} {
            justify-content: flex-end;
          }


        `}</style>
        <style>{styles}</style>
      </div>
    );
  }
}


const mapStateToProps = ({ user, editGroupDescriptionForm }) => ({
  user,
  editGroupDescriptionForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'editGroupDescriptionForm', enableReinitialize: true, })(DiscussionBoardInviteNewMemberToSlooh));
