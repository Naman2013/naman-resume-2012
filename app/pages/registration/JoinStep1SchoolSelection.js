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
import InputField from 'components/form/InputField';
import styles from './JoinStep1SchoolSelection.style';
import { CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL, CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL } from 'services/classroom/classroom';
import axios from 'axios';

class JoinStep1SchoolSelection extends Component {
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

  /* This function handles a zipcode change in the form and sets the state accordingly */
  handleZipCodeChange({ value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const field = "zipcode";
    const schoolDistrictFormDetailsData = cloneDeep(this.state.schoolDistrictFormDetails);
    schoolDistrictFormDetailsData[field].value = value;

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

  /* This function handles a zipcode change in the form and sets the state accordingly */
  handleSchoolDistrictChange({ value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const field = "district";
    const schoolDistrictFormDetailsData = cloneDeep(this.state.schoolDistrictFormDetails);
    schoolDistrictFormDetailsData[field].value = value;

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

    window.localStorage.setItem('selectedSchoolId', '010000500871');

    browserHistory.push('/join/step2');
  }

  render() {
    return (
      <div className="step-root">
        <div className="inner-container">
          <div className="section-heading">Classroom (Teacher) account has been selected. </div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-section">
              <div className="form-field-container">
                <span className="form-label">Zipcode:</span>
                <Field
                  name="zipcode"
                  type="name"
                  label="Enter your zipcode"
                  component={InputField}
                  onChange={(event) => { this.handleZipCodeChange({ value: event.target.value }); }}
                />
              </div>

              {this.state.schoolDistrictOptions.length > 0 &&
              <div className="form-field-container">
                <span className="form-label">District:</span>
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
                <span className="form-label">School:</span>
                <Field
                  name="school"
                  className="input-row form-group form-control"
                  component="select"
                  >
                  {this.state.schoolOptions.map(school =>
                    <option value={school.NCESSchoolId} key={school.NCESSchoolId}>{school.SchoolName}</option>)
                  }
                </Field>
              </div>
              }
            </div>

            <div className="button-container">
              <Button
                type="button"
                text="Go Back"
                onClickEvent={() => { browserHistory.push('/join/step1'); }}
              />
              <button
                className="submit-button"
                type="submit"
              >Continue
              </button>

            </div>
          </form>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

const mapStateToProps = ({ schoolDistrictForm }) => ({
  schoolDistrictForm: schoolDistrictForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'schoolDistrictForm', enableReinitialize: true, })(JoinStep1SchoolSelection));
