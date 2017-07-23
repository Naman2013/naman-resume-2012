import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../components/form/InputField';
import TextareaField from '../../components/form/TextareaField';
import { createValidator, required, maxLength } from '../../modules/utils/validation';
import { contact } from '../../modules/Contact';
// import styles from '../styles/login.scss';
const { bool, func, string } = PropTypes;

class Contact extends Component {

  static propTypes = {
    contact: func.isRequired,
    handleSubmit: func.isRequired,
    contactFormError: string,
    isSent: bool,
  };

  render() {
    const { handleSubmit, contact, contactFormError, isSent } = this.props;
    return (
      <section className="contact-us">
        <article className="card-wide padding-med">
          <header className="margin-bottom-reg" />

          <form name="contact" onSubmit={handleSubmit(contact)}>

            <fieldset className="form-group pull-left half-width-margin required">
              <Field
                name="firstName"
                className="form-control input-lg"
                type="text"
                label="First Name"
                maxLength={30}
                component={InputField}
              />
            </fieldset>
            <fieldset className="form-group pull-right half-width required">
              <Field
                name="lastName"
                className="form-control input-lg"
                type="text"
                label="Last Name"
                maxLength={50}
                component={InputField}
              />
            </fieldset>
            <fieldset className="clearfix form-group required">
              <Field
                name="emailAddress"
                className="form-control input-lg"
                type="emailAddress"
                label="Email Address"
                maxLength={150}
                component={InputField}
              />
            </fieldset>
            <fieldset className="clearfix form-group">
              <Field
                name="subject"
                className="form-control input-lg"
                type="text"
                label="Subject"
                maxLength={100}
                component={InputField}
              />
            </fieldset>
            <fieldset className="clearfix form-group required">
              <Field
                name="message"
                type="text"
                label="Your Message"
                maxLength={1800}
                component={TextareaField}
              />
            </fieldset>

            {contactFormError && <strong>{contactFormError}</strong>}
            {!contactFormError && isSent && <strong>Message successfully sent.</strong>}

            <footer>
              <button className="btn-primary" >Submit Message</button>
            </footer>
          </form>


        </article>
      </section>
    );
  }
}

const mapStateToProps = ({ contactForm }) => ({
  ...contactForm,
});

const mapDispatchToProps = dispatch => ({
  contact: bindActionCreators(contact, dispatch),
});

const loginValidation = createValidator({
  firstName: [required, maxLength(30)],
  lastName: [required, maxLength(50)],
  emailAddress: [required, maxLength(150)],
  message: [required, maxLength(1800)],
  subject: [maxLength(100)],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'contact',
  validate: loginValidation,
})(Contact));
