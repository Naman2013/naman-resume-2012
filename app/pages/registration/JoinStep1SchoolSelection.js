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

import axios from 'axios';

class JoinStep1SchoolSelection extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    schoolDistrictFormDetails: {
      zipcode: {
        label: '',
        value: '',
        hintText: '',
        errorText: ''
      },
      school: {
        label: '', value: '', hintText: '', errorText: ''
      },
      district: {
        label: '', value: '', hintText: '', errorText: ''
      },
    },
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange({ field, value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const schoolDistrictFormDetailsData = cloneDeep(this.state.schoolDistrictFormDetails);
    schoolDistrictFormDetailsData[field].value = value;

    //console.log(field);
    //console.log(value);
    //console.log(accountFormDetailsData);

    this.setState({
      schoolDistrictFormDetails: schoolDistrictFormDetailsData,
    });
  }

  handleSubmit = (formValues) => {
    formValues.preventDefault();

    window.localStorage.setItem('selectedSchoolId', '010000500871');

    browserHistory.push('/join/step2');
  }

  render() {
    const districtList = [
      {key: "-1", name: "Please Select a District"},
      {key: "1.0", name: "Region 14"},
    ];

    const schoolList = [
      {key: "-1", name: "Please Select a School"},
      {key: "1.0", name: "Bethlehem Elementary School"},
    ];

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
                  onChange={(event) => { this.handleFieldChange({ field: 'zipcode', value: event.target.value }); }}
                />
              </div>

              <div className="form-field-container">
                <span className="form-label">District:</span>
                <Field
                  name="district"
                  className="input-row form-group form-control"
                  component="select"
                >
                  {districtList.map(ranking =>
                    <option value={ranking.key} key={ranking.key}>{ranking.name}</option>)
                  }
                </Field>
              </div>

              <div className="form-field-container">
                <span className="form-label">School:</span>
                <Field name="school" className="input-row form-group form-control" component="select">
                  {schoolList.map(ranking =>
                    <option value={ranking.key} key={ranking.key}>{ranking.name}</option>
                  )}
                </Field>
              </div>
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

const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm: joinAccountForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'schoolDistrictForm', enableReinitialize: true, })(JoinStep1SchoolSelection));
