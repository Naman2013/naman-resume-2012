/** *********************************
 * V4 Join - Step 1 - Select a Plan
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import InputField from 'components/form/InputField';
import {
  CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL,
  CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL,
  CLASSROOM_CREATE_NEW_SCHOOL,
} from 'services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'services/registration/registration.js';
import axios from 'axios';
import debounce from 'lodash/debounce';
import JoinHeader from './partials/JoinHeader';
import { CLASSROOM_JOIN_TABS } from './StaticNavTabs';
import styles from './JoinStep1SchoolSelection.style';
import messages from './JoinInviteByCodeStep1.messages';

const { string } = PropTypes;

class JoinStep1SchoolSelectionGeneral extends Component {
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
  }

  state = {
    formFieldLabels: null,
    pageHeading1: '',
    pageHeading2: '',
    sectionHeading: '',
    schoolDistrictOptions: [],
    schoolOptions: [],
  };

  componentDidMount() {
    axios
      .post(JOIN_PAGE_ENDPOINT_URL, {
        callSource: 'selectSchoolDistrict',
      })
      .then(({ data }) => {
        this.setState({
          formFieldLabels: data.formFieldLabels,
          pageHeading1: data.pageHeading1,
          pageHeading2: data.pageHeading2,
          sectionHeading: data.sectionHeading,
        });
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

  handleSubmit = formValues => {
    formValues.preventDefault();
console.log('xui');
   
  };

  render() {
    const { pathname, intl, isNewSchool, schoolCountry } = this.props;

    const {
      pageHeading1,
      pageHeading2,
      sectionHeading,
      formFieldLabels,
      schoolDistrictOptions,
      schoolOptions,
    } = this.state;

    return (
      <div>
        <Fragment>
          {formFieldLabels && (
            <Fragment>
              <JoinHeader
                mainHeading={pageHeading1}
                subHeading={pageHeading2}
                // activeTab={pathname}
                activeTab="join/step1SchoolSelection"
                tabs={CLASSROOM_JOIN_TABS}
              />
              <div className="step-root">
                <div className="inner-container">
                  <div className="section-heading">{sectionHeading}</div>
                  <form className="form" onSubmit={this.handleSubmit}>
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
                          <span>
                            <Field
                              name="isNewSchool"
                              type="checkbox"
                              component="input"
                              // onChange = {()=>console.log(this)}
                            />
                            <span className="form-label">
                              {formFieldLabels.isSchoolInMarketList.label}
                            </span>
                          </span>
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

                      {isNewSchool && (
                        <Fragment>
                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolDistrict.label
                            }
                          </span>
                          <Field
                            name="newDistrict"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolDistrict.hintText
                            }
                            component={InputField}
                          />

                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolName.label
                            }
                          </span>
                          <Field
                            name="schoolName"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolName.hintText
                            }
                            component={InputField}
                          />

                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
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
                                    .schoolNotInMarketListFormFields.schoolState
                                    .label
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
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolCity.label
                            }
                          </span>
                          <Field
                            name="schoolCity"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolCity.hintText
                            }
                            component={InputField}
                          />

                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolAddress.label
                            }
                          </span>
                          <Field
                            name="schoolAddress"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolAddress.hintText
                            }
                            component={InputField}
                          />

                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolPhoneNumber.label
                            }
                          </span>
                          <Field
                            name="schoolPhone"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolPhoneNumber.hintText
                            }
                            component={InputField}
                          />

                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolWebsite.label
                            }
                          </span>
                          <Field
                            name="schoolWebsite"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
                                .schoolWebsite.hintText
                            }
                            component={InputField}
                          />

                          <span className="form-label">
                            {
                              formFieldLabels.schoolNotInMarketListFormFields
                                .districtWebsite.label
                            }
                          </span>
                          <Field
                            name="districtWebsite"
                            label={
                              formFieldLabels.schoolNotInMarketListFormFields
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
                        text={intl.formatMessage(messages.GoBack)}
                        onClickEvent={() => {
                          browserHistory.push('/join/step1');
                        }}
                      />
                      <button className="submit-button" type="submit">
                        {intl.formatMessage(messages.Continue)}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Fragment>
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
})(injectIntl(JoinStep1SchoolSelectionForm));

export default JoinStep1SchoolSelection;
