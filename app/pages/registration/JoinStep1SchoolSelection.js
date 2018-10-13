/** *********************************
* V4 Join - Step 1 - Select a Plan
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';

import axios from 'axios';

class JoinStep1SchoolSelection extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    schoolDistrictFormDetails: {
      zipcode: { label: '', value: '', hintText: '', errorText: ''},
      school: { label: '', value: '', hintText: '', errorText: ''},
      district: { label: '', value: '', hintText: '', errorText: ''},
    },
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange({ field, value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    var schoolDistrictFormDetailsData = this.state.schoolDistrictFormDetails;
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
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '400px'}}>
        <p><b>Classroom (Teacher) account has been selected......</b></p>
        <p>School / District Lookup and Selection</p>
        <br/>
        <br/>
        <form className="form" onSubmit={this.handleSubmit}>
          <Field
            name="zipcode"
            type="name"
            label="Enter in a Zip Code"
            component={InputField}
            onChange={(event) => { this.handleFieldChange({ field: 'zipcode', value: event.target.value }); }}
          />
          <br/>
          <br/>
          <Field
            name="district"
            className="input-row form-group form-control"
            component="select">
              {districtList.map(ranking =>
                <option value={ranking.key} key={ranking.key}>{ranking.name}</option>
              )}
          </Field>
          <br/>
          <br/>
          <Field name="school" className="input-row form-group form-control" component="select">
            {schoolList.map(ranking =>
              <option value={ranking.key} key={ranking.key}>{ranking.name}</option>
            )}
          </Field>
          <br/>
          <br/>
          <br/>
          <Link to="/join/step1"><Button theme={{ margin: '0 auto'}} type="button" text="Go Back"/></Link><br/>
          <br/>
          <br/>
          <Button theme={{ margin: '0 auto'}} type="submit" text="Continue"/><br/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm: joinAccountForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'schoolDistrictForm', enableReinitialize: true, })(JoinStep1SchoolSelection));
