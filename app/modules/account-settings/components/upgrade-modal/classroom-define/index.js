/** *********************************
 * V4 Join - Step 1 - Select a Plan
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'app/components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import InputField from 'app/components/form/InputField';
import {
  CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL,
  CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL,
  CLASSROOM_CREATE_NEW_SCHOOL,
} from 'app/services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import { GoogleLogin } from 'react-google-login';
import {
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  GOOGLE_SSO_LINKACCT_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { getUserInfo } from 'app/modules/User';
import Request from 'app/components/common/network/Request';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { DeviceContext } from 'app/providers/DeviceProvider';
import styles from 'app/pages/registration/JoinStep1SchoolSelection.style';
import messages from 'app/pages/registration/JoinInviteByCodeStep1.messages';

const { string } = PropTypes;

class ClassroomDefineSchoolSelectionGeneral extends Component {
  static propTypes = {
    pathname: string,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    // pathname: '/join/step1',
    pathname: 'join/step1SchoolSelection',
  };

  constructor(props) {
    super(props);
    this.debouncedZipChange = debounce(this.handleZipCodeChange, 300);

    //clear localStorage
    window.localStorage.removeItem('isClassroom');
    window.localStorage.removeItem('selectedSchoolId');
  }

  state = {
    formFieldLabels: null,
    pageHeading1: '',
    pageHeading2: '',
    sectionHeading: '',
    schoolDistrictOptions: [],
    schoolOptions: [],
    selectedSubscriptionPlan: {},
  };

  componentDidMount() {
    axios
      .post(JOIN_PAGE_ENDPOINT_URL, {
        callSource: 'selectSchoolDistrict',
        selectedPlanId: window.localStorage.getItem('selectedPlanId'),
      })
      .then(({ data }) => {
        this.setState({
          formFieldLabels: data.formFieldLabels,
          pageHeading1: data.pageHeading1,
          pageHeading2: data.pageHeading2,
          sectionHeading: data.sectionHeading,
          selectedSubscriptionPlan: data.selectedSubscriptionPlan,
        });
        const { change } = this.props;
        change(
          'schoolCountry',
          Object.keys(data.formFieldLabels.schoolNotInMarketListCountryList)[0]
        );
        change(
          'schoolState',
          Object.keys(data.formFieldLabels.schoolNotInMarketListStateList)[0]
        );
      });
  }

  /* This function handles a zipcode change in the form and sets the state accordingly */
  handleZipCodeChange = value => {
    if (value.length >= 5) {
      //get a list of school districts for this zipcode.
      axios
        .post(CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL, {
          zipcode: value,
          includePleaseSelectOption: 'yes',
        })
        .then(response => {
          const res = response.data;
          if (!res.apiError) {
            const districtResult = {
              districtList: res.districtList,
            };
            this.setState({
              schoolDistrictOptions: districtResult.districtList,
              schoolOptions: {},
            });
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    } else {
      //reset the form
      this.setState({
        schoolDistrictOptions: {},
        schoolOptions: {},
      });
    }
  };

  /* This function handles a School District change in the form and sets the state accordingly */
  handleSchoolDistrictChange = value => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    if (value !== '') {
      //get a list of schools for this school district.
      //console.log("Get a list of schools for this district." + value);

      axios
        .post(CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL, {
          districtExternalId: value,
          includePleaseSelectOption: 'yes',
        })
        .then(response => {
          const res = response.data;
          if (!res.apiError) {
            const schoolResult = {
              schoolList: res.schoolList,
            };
            this.setState({
              schoolOptions: schoolResult.schoolList,
            });
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    } else {
      //reset the form
      this.setState({
        schoolOptions: {},
      });
    }
  };

  handleSubmit = values => {
    //formValues.preventDefault();

    if (!values.isNewSchool) {
      if (values.school) {
        window.localStorage.setItem('isClassroom', "true" );
        window.localStorage.setItem('selectedSchoolId', values.school);
        this.props.goNext();
      } else {
        console.log("nothing is selected, can't continue...");
      }
    } else {
      const {
        schoolName,
        schoolAddress,
        schoolCountry,
        districtName,
        schoolPhoneNumber,
        schoolWebsite,
        districtWebsite,
        schoolCity,
        schoolState,
      } = values;
      axios
        .post(CLASSROOM_CREATE_NEW_SCHOOL, {
          schoolName,
          schoolAddress,
          schoolCountry,
          schoolDistrict: districtName,
          schoolPhoneNumber,
          schoolWebsite,
          districtWebsite,
          schoolCity,
          schoolState,
        })
        .then(({ data }) => {
          window.localStorage.setItem('isClassroom', "true");
          window.localStorage.setItem('selectedSchoolId', data.schoolId);
          this.props.goNext();
        });
    }
  };

  /* The API response to the Google SSO Request was successful, process the response data elements accordingly and send the information back to the Slooh servers */
  processGoogleSuccessResponse = googleTokenData => {
    // console.log("Processing Google Signin: " + googleTokenData);

    /* Process the Google SSO tokens and get back information about this user via the Slooh APIs/Google APIs, etc. */
    axios
      .post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL, {
        authenticationCode: googleTokenData.code,
      })
      .then(response => {
        const res = response.data;
        if (!res.apiError) {
          const googleProfileResult = {
            googleProfileId: res.googleProfileId,
            googleProfileEmail: res.googleProfileInfo.email,
            googleProfileGivenName: res.googleProfileInfo.givenName,
            googleProfileFamilyName: res.googleProfileInfo.familyName,
            googleProfilePictureURL: res.googleProfileInfo.profilePictureURL,
          };

          //link it to the customer account if the email address matches....
          const user = getUserInfo();

          axios
            .post(GOOGLE_SSO_LINKACCT_ENDPOINT_URL, {
              cid: user.cid,
              at: user.at,
              token: user.token,
              googleProfileId: res.googleProfileId,
            })
            .then(response => {
              const res = response.data;
              if (!res.apiError) {
                /* the API verifies that the email address matches that on the account */f
                if (res.status == "success") {
                  /* Set the Google Profile ID/Email */
                  window.localStorage.setItem(
                    'googleProfileId',
                    googleProfileResult.googleProfileId
                  );
                  window.localStorage.setItem(
                    'googleProfileEmail',
                    googleProfileResult.googleProfileEmail
                  );
                }
              }
            })
            .catch(err => {
              throw ('Error: ', err);
            });
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  processGoogleFailureResponse = googleMessageData => {
    console.log(googleMessageData);
  };

  render() {
    const {
      pathname,
      intl,
      isNewSchool,
      schoolCountry,
      handleSubmit,
    } = this.props;

    const {
      pageHeading1,
      pageHeading2,
      sectionHeading,
      formFieldLabels,
      schoolDistrictOptions,
      schoolOptions,
      selectedSubscriptionPlan,
    } = this.state;

    return (
      <div>
        <Fragment>
          {formFieldLabels && (
            <DeviceContext.Consumer>
              {({ isMobile, isDesktop, isTablet }) => (
                <Fragment>
                  <h1 className="modal-h">Classroom Set Up</h1>
  	      	      <p className="modal-p mb-5">We need a few more details to complete your classroom account.</p>
                  <div className="step-root">
                    <div className="inner-container">
                      <div className="section-heading">Step 1: Using Google Classroom?</div>
                      <div style={{textAlign: "center"}}>
                        <Request
                          serviceURL={GOOGLE_CLIENT_ID_ENDPOINT_URL}
                          requestBody={{
                            callSource: 'upgrade',
                          }}
                          render={({
                            fetchingContent: fetchingGoogleClient,
                            serviceResponse: googleClientResponse,
                          }) => (
                            <Fragment>
                              {!fetchingGoogleClient && (
                                <div style={{marginLeft: "auto", marginRight: "auto", textAlign: "center", width: "350px"}} className="google-login-button">
                                  <GoogleLogin
                                    prompt="select_account"
                                    responseType={
                                      googleClientResponse.googleClientResponseType
                                    }
                                    fetchBasicProfile={
                                      googleClientResponse.googleClientFetchBasicProfile
                                    }
                                    accessType={
                                      googleClientResponse.googleClientAccessType
                                    }
                                    scope={
                                      googleClientResponse.googleClientScope
                                    }
                                    clientId={
                                      googleClientResponse.googleClientID
                                    }
                                    buttonText={
                                      googleClientResponse.loginButtonText
                                    }
                                    onSuccess={
                                      this.processGoogleSuccessResponse
                                    }
                                    onFailure={
                                      this.processGoogleFailureResponse
                                    }
                                  />
                                </div>
                              )}
                            </Fragment>
                          )}
                        />
                      </div>
                      <br/>
                      <br/>
                      <div className="section-heading">Step 2: {sectionHeading}</div>
                      <form
                        className="form"
                        onSubmit={handleSubmit(this.handleSubmit)}
                      >
                        <div className="form-section">
                          <div className="form-field-container">
                            <Fragment>
                              <span className="form-label">
                                {formFieldLabels.zipcode.label}
                              </span>
                              <Field
                                name="zipcode"
                                type="name"
                                label={formFieldLabels.zipcode.hintText}
                                component={InputField}
                                onChange={(e, value) =>
                                  this.debouncedZipChange(value)
                                }
                              />
                            </Fragment>
                            <br/>
                          </div>

                          {!isNewSchool && schoolDistrictOptions.length > 0 && (
                            <Fragment>
                              <div className="form-field-container">
                                <span className="form-label">
                                  {formFieldLabels.district.label}
                                </span>
                                <Field
                                  name="district"
                                  className="input-row form-group form-control"
                                  component="select"
                                  onChange={event => {
                                    this.handleSchoolDistrictChange(
                                      event.target.value
                                    );
                                  }}
                                >
                                  {schoolDistrictOptions.map(schoolDistrict => (
                                    <option
                                      value={schoolDistrict.districtExternalId}
                                      key={schoolDistrict.districtExternalId}
                                    >
                                      {schoolDistrict.DistrictName}
                                    </option>
                                  ))}
                                </Field>
                                <br/>
                              </div>

                              {schoolOptions.length && (
                                <div className="form-field-container">
                                  <span className="form-label">
                                    {formFieldLabels.school.label}
                                  </span>
                                  <Field
                                    name="school"
                                    className="input-row form-group form-control"
                                    component="select"
                                  >
                                    {schoolOptions.map(school => (
                                      <option
                                        value={school.schoolId}
                                        key={school.schoolExternalId}
                                      >
                                        {school.SchoolName}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                              )}
                            </Fragment>
                          )}

                          <span>
                            <br/>
                            <br/>

                            <Field
                              name="isNewSchool"
                              type="checkbox"
                              component="input"
                              // onChange = {()=>console.log(this)}
                            />
                            &nbsp;&nbsp;
                            <span className="form-label">
                              {formFieldLabels.isSchoolInMarketList.label}
                            </span>
                          </span>

                          {isNewSchool && (
                            <Fragment>
                              <br/>
                              <br/>
                              <br/>
                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolDistrict.label
                                }
                              </span>
                              <Field
                                name="districtName"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolDistrict.hintText
                                }
                                component={InputField}
                              />

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields.schoolName
                                    .label
                                }
                              </span>
                              <Field
                                name="schoolName"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields.schoolName
                                    .hintText
                                }
                                component={InputField}
                              />

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolCountry.label
                                }
                              </span>
                              <br />
                              <Field
                                name="schoolCountry"
                                component="select"
                                style={{ margin: '15px' }}
                              >
                                {Object.keys(
                                  formFieldLabels.schoolNotInMarketListCountryList
                                ).map(x => (
                                  <option value={x} key={x}>
                                    {
                                      formFieldLabels
                                        .schoolNotInMarketListCountryList[x]
                                    }
                                  </option>
                                ))}
                              </Field>
                              <br />

                              {schoolCountry === 'US' && (
                                <Fragment>
                                  <span className="form-label">
                                    {
                                      formFieldLabels
                                        .schoolNotInMarketListFormFields
                                        .schoolState.label
                                    }
                                  </span>
                                  <br />
                                  <Field
                                    name="schoolState"
                                    component="select"
                                    style={{ margin: '15px' }}
                                  >
                                    {Object.keys(
                                      formFieldLabels.schoolNotInMarketListStateList
                                    ).map(x => (
                                      <option value={x} key={x}>
                                        {
                                          formFieldLabels
                                            .schoolNotInMarketListStateList[x]
                                        }
                                      </option>
                                    ))}
                                  </Field>
                                  <br />
                                </Fragment>
                              )}

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields.schoolCity
                                    .label
                                }
                              </span>
                              <Field
                                name="schoolCity"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields.schoolCity
                                    .hintText
                                }
                                component={InputField}
                              />

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolAddress.label
                                }
                              </span>
                              <Field
                                name="schoolAddress"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolAddress.hintText
                                }
                                component={InputField}
                              />

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolPhoneNumber.label
                                }
                              </span>
                              <Field
                                name="schoolPhone"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolPhoneNumber.hintText
                                }
                                component={InputField}
                              />

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolWebsite.label
                                }
                              </span>
                              <Field
                                name="schoolWebsite"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .schoolWebsite.hintText
                                }
                                component={InputField}
                              />

                              <span className="form-label">
                                {
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .districtWebsite.label
                                }
                              </span>
                              <Field
                                name="districtWebsite"
                                label={
                                  formFieldLabels
                                    .schoolNotInMarketListFormFields
                                    .districtWebsite.hintText
                                }
                                component={InputField}
                              />
                            </Fragment>
                          )}

                          <br />
                        </div>
                        <br/>
                        <div style={{float: "right"}} className="button-container">
                          <button className="submit-button" type="submit">
                            {intl.formatMessage(messages.Continue)}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Fragment>
              )}
            </DeviceContext.Consumer>
          )}
        </Fragment>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const ClassroomDefineSchoolSelectionForm = reduxForm({
  form: 'schoolDistrictForm',
  enableReinitialize: true,
})(ClassroomDefineSchoolSelectionGeneral);

const selector = formValueSelector('schoolDistrictForm');
const ClassroomDefineSchoolSelection = connect(state => {
  const { zipCode, isNewSchool, district, schoolCountry } = selector(
    state,
    'zipcode',
    'isNewSchool',
    'district',
    'schoolCountry'
  );
  return { zipCode, isNewSchool, district, schoolCountry };
})(injectIntl(ClassroomDefineSchoolSelectionForm));

export default ClassroomDefineSchoolSelection;
