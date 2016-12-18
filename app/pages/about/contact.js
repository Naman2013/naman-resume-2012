import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import InputField from '../../components/form/InputField';
import TextareaField from '../../components/form/TextareaField';
import {createValidator, required} from '../../modules/utils/validation';
import {contact} from '../../modules/Contact';
// import styles from '../styles/login.scss';
const {func, string} = PropTypes;

class Contact extends Component {

    static propTypes = {
        contact: func.isRequired,
        handleSubmit: func.isRequired,
        error: string,
    };

    render() {
        let {handleSubmit, contact, error} = this.props;
        return (
            <section className="job-posts">
                <article className="card-wide">
                    <header className="margin-bottom-reg">
                    </header>

                    <form name="contact" onSubmit={handleSubmit(contact)}>

                        <fieldset className="form-group pull-left half-width-margin required">
                            <Field
                                name="firstname"
                                className="form-control input-lg"
                                type="text"
                                label="First Name"
                                component={InputField}
                            />
                        </fieldset>
                        <fieldset className="form-group pull-right half-width required">
                            <Field
                                name="lastname"
                                className="form-control input-lg"
                                type="text"
                                label="Last Name"
                                component={InputField}
                            />
                        </fieldset>
                        <fieldset className="clearfix form-group required">
                            <Field
                                name="email"
                                className="form-control input-lg"
                                type="email"
                                label="Email Address"
                                component={InputField}
                            />
                        </fieldset>
                        <fieldset className="clearfix form-group required">
                            <Field
                                name="message"
                                type="text"
                                label="Your Message"
                                component={TextareaField}
                            />
                        </fieldset>

                        {error && <strong>{error}</strong>}

                        <footer>
                            <button className="btn-primary" >Submit Message</button>
                        </footer>
                    </form>


                </article>
            </section>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        contact: bindActionCreators(contact, dispatch)
    }
}

const loginValidation = createValidator({
    firstname: [required],
    lastname: [required],
    email: [required],
    message: [required],
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'contact',
    validate: loginValidation
})(Contact));


