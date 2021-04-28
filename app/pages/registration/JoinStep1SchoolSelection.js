/** *********************************
 * V4 Join - Step 1 - Select a Plan
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Button from 'app/components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import InputField from 'app/components/form/InputField';
import {
  CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL,
  CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL,
  CLASSROOM_CREATE_NEW_SCHOOL,
} from 'app/services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import { API } from 'app/api';
import debounce from 'lodash/debounce';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from './partials/JoinHeader';
import { CLASSROOM_JOIN_TABS } from './StaticNavTabs';
import styles from './JoinStep1SchoolSelection.style';

const { string } = PropTypes;
@withTranslation()
class JoinStep1SchoolSelectionGeneral extends Component {
  static propTypes = {
    pathname: string,
  };

  static defaultProps = {
    // pathname: '/join/step1',
    pathname: 'join/step1SchoolSelection',
  };

  constructor(props) {
    super(props);
    this.debouncedZipChange = debounce(this.handleZipCodeChange, 300);
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
    API.post(JOIN_PAGE_ENDPOINT_URL, {
      callSource: 'selectSchoolDistrict',
      selectedPlanId: window.localStorage.getItem('selectedPlanId'),
    }).then(({ data }) => {
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
      API.post(CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL, {
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
      

      API.post(CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL, {
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
        window.localStorage.setItem('selectedSchoolId', values.school);
        browserHistory.push('/join/step2');
      } else {
        
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
      API.post(CLASSROOM_CREATE_NEW_SCHOOL, {
        schoolName,
        schoolAddress,
        schoolCountry,
        schoolDistrict: districtName,
        schoolPhoneNumber,
        schoolWebsite,
        districtWebsite,
        schoolCity,
        schoolState,
      }).then(({ data }) => {
        window.localStorage.setItem('selectedSchoolId', data.schoolId);
        browserHistory.push('/join/step2');
      });
    }
  };

  render() {
    const {
      pathname,
      t,
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
                  <JoinHeader
                    mainHeading={pageHeading1}
                    subHeading={pageHeading2}
                    // activeTab={pathname}
                    activeTab="join/step1SchoolSelection"
                    tabs={CLASSROOM_JOIN_TABS}
                    backgroundImage={
                      isMobile
                        ? selectedSubscriptionPlan?.planSelectedBackgroundImageUrl_Mobile
                        : isDesktop
                        ? selectedSubscriptionPlan?.planSelectedBackgroundImageUrl_Desktop
                        : isTablet
                        ? selectedSubscriptionPlan?.planSelectedBackgroundImageUrl_Tablet
                        : ''
                    }
                  />
                  <div className="step-root">
                    <div className="inner-container">
                      <div className="section-heading">{sectionHeading}</div>
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
                            <Field
                              name="isNewSchool"
                              type="checkbox"
                              component="input"
                              
                            />
                            <span className="form-label">
                              {formFieldLabels.isSchoolInMarketList.label}
                            </span>
                          </span>

                          {isNewSchool && (
                            <Fragment>
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
                        <div className="button-container">
                          <Button
                            type="button"
                            text={t('Ecommerce.GoBack')}
                            onClickEvent={() => {
                              browserHistory.push('/join/step1');
                            }}
                          />
                          <button className="submit-button" type="submit">
                            {t('Ecommerce.Continue')}
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

const JoinStep1SchoolSelectionForm = reduxForm({
  form: 'schoolDistrictForm',
  enableReinitialize: true,
})(JoinStep1SchoolSelectionGeneral);

const selector = formValueSelector('schoolDistrictForm');
const JoinStep1SchoolSelection = connect(state => {
  const { zipCode, isNewSchool, district, schoolCountry } = selector(
    state,
    'zipcode',
    'isNewSchool',
    'district',
    'schoolCountry'
  );
  return { zipCode, isNewSchool, district, schoolCountry };
})(JoinStep1SchoolSelectionForm);

export default JoinStep1SchoolSelection;
