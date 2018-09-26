/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import Button from 'components/common/style/buttons/Button';

import Request from 'components/common/network/Request';

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

    store.setState( { "joinAccountForm": formValues } );

    console.log(this.state);
  }

  render() {
    const JOIN_PAGE_ENDPOINT_URL = '/api/page/join';

    const joinPageModel = {
      name: 'JOIN_PAGE_MODEL',
      model: resp => ({
        pageHeading1: resp.pageHeading1,
        pageHeading2: resp.pageHeading2,
        sectionHeading: resp.sectionHeading,
        selectedSubscriptionPlan: resp.selectedSubscriptionPlan,
      }),
    };

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        model={joinPageModel}
        requestBody={{ 'callSource': 'setupCredentials', 'selectedPlanID': this.props.params.subscriptionPlanID }}
        render={({
          fetchingContent,
          modeledResponses: { JOIN_PAGE_MODEL },
        }) => (
          <Fragment>
            {
              !fetchingContent && this.props.params.subscriptionPlanID &&
                <Fragment>
                    <header className="header">
                      <div className="icon"></div>
                    </header>
                    <h1>{JOIN_PAGE_MODEL.pageHeading1}</h1>
                    <h2>{JOIN_PAGE_MODEL.pageHeading2}</h2>
                    <br/>
                    <h3>Step 2: {JOIN_PAGE_MODEL.sectionHeading}</h3>
                    <br/>
                    <br/>
                    <p>Selected Plan: {JOIN_PAGE_MODEL.selectedSubscriptionPlan.planName} (Plan ID: {this.props.params.subscriptionPlanID})</p>
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
                          label="Enter a Display Name (Optional)"
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

                      <Link to="/join/step3"><Button theme={{ margin: '0 auto'}} type="submit" text="Goto Payment" onClickEvent={null} /></Link>
                      <br/>
                      <br/>
                      <Link to="/join/step1"><Button theme={{ margin: '0 auto'}} type="button" text="Go Back"/></Link><br/>

                    </form>
                    <br/>
                    <br/>
                </Fragment>
              }
              </Fragment>
            )}
          />
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

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinAccountForm', validate: joinStep2Validation })(JoinStep2));
