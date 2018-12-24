/** *********************************
* V4 Join - Step 1 - Select a Plan
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import InputField from 'components/form/InputField';
import { CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL, CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL } from 'services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'services/registration/registration.js';
import axios from 'axios';
import Request from 'components/common/network/Request';
import JoinHeader from './partials/JoinHeader';
import { CLASSROOM_JOIN_TABS } from './StaticNavTabs';
import styles from './JoinStep1SchoolSelection.style';
import messages from './JoinInviteByCodeStep1.messages';



const {
  string,
} = PropTypes;

class JoinStep1SchoolSelection extends Component {
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
  }

  state = {
    schoolDistrictOptions: { },
    schoolOptions: { },
    schoolDistrictFormDetails: {
      zipcode: {
        label: '',
        value: '',
        hintText: '',
        errorText: ''
      },
      school: {
        label: '', value: '', hintText: '', errorText: '',
      },
      district: {
        label: '', value: '', hintText: '', errorText: '',
      },
    },
  };


// Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
handleJoinPageServiceResponse = (result) => {
  const newSchoolDistrictFormData = cloneDeep(this.state.schoolDistrictFormDetails);

  newSchoolDistrictFormData.zipcode.label = result.formFieldLabels.zipcode.label;
  newSchoolDistrictFormData.district.label = result.formFieldLabels.district.label;
  newSchoolDistrictFormData.school.label = result.formFieldLabels.school.label;

  newSchoolDistrictFormData.zipcode.hintText = result.formFieldLabels.zipcode.hintText;
  newSchoolDistrictFormData.district.hintText = result.formFieldLabels.district.hintText;
  newSchoolDistrictFormData.school.hintText = result.formFieldLabels.school.hintText;

  /* update the account form details state so the correct hinText will show on each form field */
  this.setState(() => ({
    schoolDistrictFormDetails: newSchoolDistrictFormData,
    /* was the selected plan an astronomy club? */
  }));
}

  /* This function handles a zipcode change in the form and sets the state accordingly */
  handleZipCodeChange({ value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const field = "zipcode";
    const schoolDistrictFormDetailsData = cloneDeep(this.state.schoolDistrictFormDetails);
    schoolDistrictFormDetailsData[field].value = value;
    schoolDistrictFormDetailsData["district"].value = "";
    schoolDistrictFormDetailsData["school"].value = "";

    this.setState({
      schoolDistrictFormDetails: schoolDistrictFormDetailsData,
    });

    if (value.length >=5) {
      //get a list of school districts for this zipcode.
      //console.log("Get a list of districts for this zipcode." + value);

      const schoolDistrictsResult = axios.post(CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL, {
        zipcode: value,
        includePleaseSelectOption: "yes",
      })
        .then((response) => {
          const res = response.data;
          if (res.apiError == false) {
            const districtResult = {
              districtList: res.districtList,
            }
            this.setState({
              schoolDistrictOptions: districtResult.districtList,
              schoolOptions: { },
            });
          }
        })
        .catch((err) => {
          throw ('Error: ', err);
        });
    }
    else {
      //reset the form
      this.setState({
        schoolDistrictOptions: { },
        schoolOptions: { },
      });
    }
  }

  /* This function handles a school change */
  handleSchoolChange({ value }) {
    const field = "school";
    const schoolDistrictFormDetailsData = cloneDeep(this.state.schoolDistrictFormDetails);
    schoolDistrictFormDetailsData[field].value = value;

    this.setState({
      schoolDistrictFormDetails: schoolDistrictFormDetailsData,
    });

    if (value !== "") {

    }
  }

  /* This function handles a School District change in the form and sets the state accordingly */
  handleSchoolDistrictChange({ value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const field = "district";
    const schoolDistrictFormDetailsData = cloneDeep(this.state.schoolDistrictFormDetails);
    schoolDistrictFormDetailsData[field].value = value;
    schoolDistrictFormDetailsData["school"].value = "";

    this.setState({
      schoolDistrictFormDetails: schoolDistrictFormDetailsData,
    });

    if (value !== "") {
      //get a list of schools for this school district.
      //console.log("Get a list of schools for this district." + value);

      const schoolResult = axios.post(CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL, {
        ncesDistrictId: value,
        includePleaseSelectOption: "yes",
      })
        .then((response) => {
          const res = response.data;
          if (res.apiError == false) {
            const schoolResult = {
              schoolList: res.schoolList,
            }
            this.setState({
              schoolOptions: schoolResult.schoolList,
            });
          }
        })
        .catch((err) => {
          throw ('Error: ', err);
        });
    }
    else {
      //reset the form
      this.setState({
        schoolOptions: { },
      });
    }
  }

  handleSubmit = (formValues) => {
    formValues.preventDefault();

    if (this.state.schoolDistrictFormDetails.school.value !== "") {
      window.localStorage.setItem('selectedSchoolId', this.state.schoolDistrictFormDetails.school.value);
      browserHistory.push('/join/step2');
    }
    else {
      console.log("nothing is selected, can't continue...");
    }
  }

  render() {
    const {
      pathname,
      intl
    } = this.props;

    return (
      <div>
      {/*<div className="step-root">*/}
        {/* <div className="inner-container"> */}
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ 'callSource': 'selectSchoolDistrict' }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({
            fetchingContent,
            serviceResponse,
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                    <JoinHeader
                      mainHeading={serviceResponse.pageHeading1}
                      subHeading={serviceResponse.pageHeading2}
                      // activeTab={pathname}
                      activeTab='join/step1SchoolSelection'
                      tabs={CLASSROOM_JOIN_TABS}
                    />

                    <div className="step-root">
                      <div className="inner-container">
                      <div className="section-heading">{serviceResponse.sectionHeading}</div>
                        <form className="form" onSubmit={this.handleSubmit}>
                          <div className="form-section">
                            <div className="form-field-container">
                              <span className="form-label">{this.state.schoolDistrictFormDetails.zipcode.label}</span>
                              <Field
                                name="zipcode"
                                type="name"
                                label={this.state.schoolDistrictFormDetails.zipcode.hintText}
                                component={InputField}
                                onChange={(event) => { this.handleZipCodeChange({ value: event.target.value }); }}
                              />
                            </div>

                            {this.state.schoolDistrictOptions.length > 0 &&
                            <div className="form-field-container">
                              <span className="form-label">{this.state.schoolDistrictFormDetails.district.label}</span>
                              <Field
                                name="district"
                                className="input-row form-group form-control"
                                component="select"
                                onChange={(event) => { this.handleSchoolDistrictChange({ value: event.target.value }); }}
                              >
                                {this.state.schoolDistrictOptions.map(schoolDistrict =>
                                  <option value={schoolDistrict.NCESDistrictId} key={schoolDistrict.NCESDistrictId}>{schoolDistrict.DistrictName}</option>)
                                }
                              </Field>
                            </div>
                            }

                            {this.state.schoolOptions.length &&
                            <div className="form-field-container">
                              <span className="form-label">{this.state.schoolDistrictFormDetails.school.label}</span>
                              <Field
                                name="school"
                                className="input-row form-group form-control"
                                component="select"
                                onChange={(event) => { this.handleSchoolChange({ value: event.target.value }); }}

                                >
                                {this.state.schoolOptions.map(school =>
                                  <option value={school.NCESSchoolId} key={school.NCESSchoolId}>{school.SchoolName}</option>)
                                }
                              </Field>
                            </div>
                            }
                            <br/>
                          </div>
                          <div className="button-container">
                            <Button
                              type="button"
                              text={intl.formatMessage(messages.GoBack)}
                              onClickEvent={() => { browserHistory.push('/join/step1'); }}
                            />
                            <button
                              className="submit-button"
                              type="submit"
                            >
                              {intl.formatMessage(messages.Continue)}
                            </button>

                          </div>
                        </form>
                      </div>
                    </div>
                    </Fragment>
                  }
                </Fragment>
              )}
            />
          {/*</div>*/}
        <style jsx>{styles}</style>
      </div>
    )
  }
}

const mapStateToProps = ({ schoolDistrictForm }) => ({
  schoolDistrictForm: schoolDistrictForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'schoolDistrictForm', enableReinitialize: true, })(injectIntl(JoinStep1SchoolSelection)));
