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

  handleSubmit = (formValues) => {
    formValues.preventDefault();
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
          <Field
            name="username"
            type="email"
            label="Email Address"
            component={InputField}
          />
          <Button theme={{ margin: '0 auto'}} type="submit" text="Step 2" onClickEvent={null} />
        </form>
        <br/>
        <br/>
        <Link to="/join/step1">Go Back</Link><br/>
        <br/>
        <Link to="/join/step3">Goto Payment</Link>
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
