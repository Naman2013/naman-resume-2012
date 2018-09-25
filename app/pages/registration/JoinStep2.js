/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import Button from 'components/common/style/buttons/Button';

class JoinStep2 extends Component {
  constructor(props) {
    super(props);
  }

  handleFieldChange({ field, value }) {
    this.setState({
      [field]: value,
    });
  }

  handleSubmit = (formValues) => {
    formValues.preventDefault();

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="icon"></div>
        </header>
        <h1>Joining Slooh is Easy</h1>
        <h2>Join Slooh in three easy steps!  Simply select a plan, enter your details, make your payment, and youre in!</h2>
        <h3>Step 2: ACCOUNT DETAILS</h3>
        <br/>
        <br/>
        <form className="form" onSubmit={this.handleSubmit}>
          <p>* First Name:
            <Field
              name="firstName"
              type="name"
              label="Given Name"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'firstName', value: event.target.value }); }}
              />
          </p>
          <br/>
          <p>* Last Name:
            <Field
              name="lastName"
              type="name"
              label="Last Name"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'lastName', value: event.target.value }); }}
            />
          </p>
          <br/>
          <p>Display Name:
            <Field
              name="displayName"
              type="name"
              label="Enter a Display Name (Optionnal)"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'displayName', value: event.target.value }); }}
            />
          </p>
          <br/>
          <p>* Login Email Address:
            <Field
              name="loginEmailAddress"
              type="email"
              label="Enter your Email Address"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddress', value: event.target.value }); }}
            />
          </p>
          <br/>
          <p>* Confirm Email Address:
            <Field
              name="loginEmailAddressVerification"
              type="email"
              label="Re-enter your Email Address"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddressVerification', value: event.target.value }); }}
            />
          </p>
          <br/>
          <p>* Password:
            <Field
              name="password"
              type="password"
              label="Create your Password"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'password', value: event.target.value }); }}
            />
          </p>
          <br/>
          <p>* Confirm password:
            <Field
              name="passwordVerification"
              type="password"
              label="Re-enter your password"
              component={InputField}
              onChange={(event) => { this.handleFieldChange({ field: 'passwordVerification', value: event.target.value }); }}
            />
          </p>

          <Button theme={{ margin: '0 auto'}} type="submit" text="Goto Payment" onClickEvent={null} />
          <br/>
          <br/>
          <Link to="/join/step1"><Button theme={{ margin: '0 auto'}} type="button" text="Go Back"/></Link><br/>

        </form>
        <br/>
        <br/>
      </div>
    )
  }
}


const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

const joinStep2Validation = createValidator({
  username: [required],
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinForm', validate: joinStep2Validation })(JoinStep2));
