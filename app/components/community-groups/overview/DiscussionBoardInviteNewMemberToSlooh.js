/********************************************************************
 * V4 Common Discussions Board - Classroom/Astronomy Club Invitations
 ********************************************************************/

import React, { PureComponent, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from 'app/components/form/InputField';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { DeviceContext } from 'providers/DeviceProvider';
import TextareaField from 'app/components/form/TextareaField';
import Button from 'app/components/common/style/buttons/Button';
import { CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL } from 'app/services/classroom/classroom';
import { CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL } from 'app/services/registration/registration';
import Request from 'app/components/common/network/Request';
import { API } from 'app/api';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import styles from './DiscussionBoardInviteNewMemberToSlooh.style';

const { any, bool, func, number, shape, string } = PropTypes;
@withTranslation()
class DiscussionBoardInviteNewMemberToSlooh extends PureComponent {
  static propTypes = {
    discussionGroupId: string,
    newInvitationComplete: func.isRequired,
  };

  static defaultProps = {
    discussionGroupId: null,
  };

  state = {
    inEditMode: false,
    inviteFormDetails: {
      firstName: {
        errorText: '',
      },
      lastName: {
        errorText: '',
      },
      emailAddress: {
        errorText: '',
      },
      emailAddressVerification: {
        errorText: '',
      },
    },
    submitError: '',
  };

  /* Submit the Form and perform any validations as needed */
  handleSubmit = formValues => {
    const { discussionGroupId, user, t ,resetSearch} = this.props;

    const inviteFormData = cloneDeep(this.state.inviteFormDetails);

    let isFormComplete = true;

    if (!formValues.firstName || formValues.firstName.value === '') {
      isFormComplete = false;
      inviteFormData.firstName.errorText = t('Clubs.FirstName');
    } else {
      inviteFormData.firstName.errorText = '';
    }

    if (!formValues.lastName || formValues.lastName.value === '') {
      isFormComplete = false;
      inviteFormData.lastName.errorText = t('Clubs.LastName');
    } else {
      inviteFormData.lastName.errorText = '';
    }

    if (!formValues.emailAddress || formValues.emailAddress.value === '') {
      isFormComplete = false;
      inviteFormData.emailAddress.errorText = t('Clubs.EmailAddress');
    } else {
      inviteFormData.emailAddress.errorText = '';
    }
    if (
      !formValues.emailAddressVerification ||
      formValues.emailAddressVerification === ''
    ) {
      isFormComplete = false;
      inviteFormData.emailAddressVerification.errorText = t(
        '.ConfirmEmailAddress'
      );
    } else if (formValues.emailAddress != formValues.emailAddressVerification) {
      isFormComplete = false;
      inviteFormData.emailAddressVerification.errorText = t(
        'Clubs.EmailsDontMatch'
      );
    } else {
      inviteFormData.emailAddressVerification.errorText = '';
    }

    if (isFormComplete === true) {
      const setInviteCompleteResult = API.post(
        CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL,
        {
          cid: user.cid,
          at: user.at,
          token: user.token,
          groupId: discussionGroupId,
          inviteeDetails: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            emailAddress: formValues.emailAddress,
          },
        }
      )
        .then(({ data }) => {
          if (data.status !== 'failed') {
            const { reset, newInvitationComplete,resetSearch } = this.props;
            reset();
            resetSearch();

            inviteFormData.firstName.errorText = '';
            inviteFormData.emailAddress.errorText = '';
            inviteFormData.lastName.errorText = '';
            inviteFormData.emailAddressVerification.errorText = '';
            this.setState({ inviteFormDetails: inviteFormData });

            newInvitationComplete();
          } else {
            this.setState({ submitError: data.statusMessage });
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    } else {
      //update the form data for any error text, etc.
      this.setState(() => ({
        inviteFormDetails: inviteFormData,
      }));
    }
  };

  render() {
    const { invitePopupContent, isFetching, handleSubmit } = this.props;

    const formDetails = invitePopupContent.formfields;

    const { inviteFormDetails, submitError } = this.state;
    if (isFetching) return null;

    return (
      <div className="groups-header-information">
        <Fragment>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div>
              <div className="form-field-container">
                <h2>{invitePopupContent.formHeading1}</h2>
                <p>{invitePopupContent.formHeading2}</p>
                <div className="form-section split">
                  <div className="form-field-container form-field-half">
                    <span
                      className="form-label"
                      dangerouslySetInnerHTML={{
                        __html: formDetails.firstname.label,
                      }}
                    />
                    :
                    <span
                      className="form-error"
                      dangerouslySetInnerHTML={{
                        __html: inviteFormDetails.firstName.errorText,
                      }}
                    />
                    <Field
                      name="firstName"
                      component={InputField}
                      label={formDetails.firstname.hintText}
                    />
                  </div>
                  <div className="form-field-container form-field-half">
                    <span
                      className="form-label"
                      dangerouslySetInnerHTML={{
                        __html: formDetails.lastname.label,
                      }}
                    />
                    :
                    <span
                      className="form-error"
                      dangerouslySetInnerHTML={{
                        __html: inviteFormDetails.lastName.errorText,
                      }}
                    />
                    <Field
                      name="lastName"
                      component={InputField}
                      label={formDetails.lastname.hintText}
                    />
                  </div>
                </div>
                <div className="form-section">
                  <div className="form-field-container">
                    <span
                      className="form-label"
                      dangerouslySetInnerHTML={{
                        __html: formDetails.emailaddress.label,
                      }}
                    />
                    :
                    <span
                      className="form-error"
                      dangerouslySetInnerHTML={{
                        __html: inviteFormDetails.emailAddress.errorText,
                      }}
                    />
                    <Field
                      name="emailAddress"
                      component={InputField}
                      label={formDetails.emailaddress.hintText}
                    />
                  </div>
                  <div className="form-field-container">
                    <span
                      className="form-label"
                      dangerouslySetInnerHTML={{
                        __html: formDetails.emailaddressverification.label,
                      }}
                    />
                    :
                    <span
                      className="form-error"
                      dangerouslySetInnerHTML={{
                        __html:
                          inviteFormDetails.emailAddressVerification.errorText,
                      }}
                    />
                    <Field
                      name="emailAddressVerification"
                      component={InputField}
                      label={formDetails.emailaddressverification.hintText}
                    />
                  </div>
                </div>
                <span className="form-error">{submitError}</span>
                <div className="button-actions">
                  <Button
                    className="submit-button"
                    type="submit"
                    theme={{ color: 'white', borderColor: 'white' }}
                    text="Send Invitation"
                  />
                </div>
              </div>
            </div>
          </form>
          <br />
        </Fragment>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ user, editGroupDescriptionForm }) => ({
  user,
  editGroupDescriptionForm,
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'discussionBoardInviteNewMemberToSloohForm',
    enableReinitialize: true,
  })(DiscussionBoardInviteNewMemberToSlooh)
);
