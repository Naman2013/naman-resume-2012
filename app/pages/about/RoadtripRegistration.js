import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../components/form/InputField';
import TextareaField from '../../components/form/TextareaField';
import { createValidator, required, maxLength } from '../../modules/utils/validation';
import { sendRoadtripForm } from '../../modules/roadtrip-registration/actions';
import styles from './roadtrip-registration.scss';
const { bool, func, string } = PropTypes;

class RoadtripRegistration extends Component {

  static propTypes = {
    registration: func.isRequired,
    handleSubmit: func.isRequired,
    registrationFormError: string,
    isSent: bool,
  };

  render() {
    const { handleSubmit, registration, registrationFormError, isSent } = this.props;
    return (
      <section className={`static-app-content-container clearfix ${styles.roadtripRegistration}`}>
        <div className="clearfix">
          <article className="static-page">
            <header className="static">
              <div className="pull-left">
                <h1>{'Reserve Your Spot at Slooh\'s Transcontinental Eclipse Festival'}</h1>
              </div>
            </header>

            <section className={styles.roadtripRegistrationForm}>
              <article className="card-wide padding-med">
                <header className="margin-bottom-reg" />
                <p>We look forward to bringing the Slooh community together in scenic Stanley, Idaho for the Total Solar Eclipse on August 21st, 2017.  This family friendly celebration commences at noon local time on Friday, August 18th, and closes down August 22nd at noon. Space is limited so reserve your spot today! Open to Slooh Apprentice and Astronomer Members and their families. Limit 1 campsite of 4 persons per Slooh account. Otherwise FREE to attend! </p>
                <p>The Location <br/>
                Elk Meadows is situated in the Sawtooth National Recreation Area. A myriad of excellent hiking and biking opportunities are available, with an estimated 750 miles of trails crisscrossing the valley and surrounding mountains, including the Idaho Centennial Trail, which passes nearby. Expansive and scenic Elk Meadow is near the campground, providing a great location for bird and wildlife watching. Numerous sparkling lakes and streams, including the Salmon River, dot the area, making for great rainbow and native Westslope cutthroat trout fishing. Stanley and Redfish Lakes are nearby with great boating, water skiing, canoeing, kayaking and even more fishing.</p>
                <p>The Event <br />
                {'The campsite will be split into four basecamps; Science Log, Art & Culture, Human Spirit, and Do-it-Yourself.  Upon registration, you will select your preferred basecamp.  In keeping with our mission, members are asked to bring something to share with their basecamp and the wider community to enhance everyone\'s appreciation of the moment.  You can bake eclipse shaped cookies, BBQ crescent shaped beef ribs, participate in the drum circle, play Space Oddity on a banjo, or read a story you posted in Community Perspectives featuring your vision of the eclipse. Please let us know what you have in mind to share with the community during the event, so we can coordinate activities and support your plans.'}</p>
                <p>Slooh will provide a range of activities leading up to totality which is at 11:28 am Monday, August 21.   Festivities include discussions and lectures with our professional astronomers and guest speakers, solar and star gazing through large telescopes, musical celebrations, group yoga classes and educational activities.  We’ll be updating this site with more information and details will be communicated as they are finalized.</p>
                <p>Campers will need to provide their own food/water. However, food truck visits and grills will be available for use at various times throughout the weekend.  There are no bathroom/shower or RV hook up facilities available at the campground.  Portable toilets will be provided during the event.  One central campfire will be used for the event and will be the gathering place for all festival attendees. Individual campfires are not allowed.</p>
                <form name="roadtrip-registration" onSubmit={handleSubmit(registration)}>

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

                  {registrationFormError && <strong>{registrationFormError}</strong>}
                  {!registrationFormError && isSent && <strong>Message successfully sent.</strong>}

                  <footer>
                    <button className="btn-primary" >Submit Message</button>
                  </footer>
                </form>


              </article>
            </section>
          </article>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ registrationForm }) => ({
  ...registrationForm,
});

const mapDispatchToProps = dispatch => ({
  registration: bindActionCreators(sendRoadtripForm, dispatch),
});

const formValidation = createValidator({
  firstName: [required, maxLength(30)],
  lastName: [required, maxLength(50)],
  emailAddress: [required, maxLength(150)],
  message: [required, maxLength(1800)],
  subject: [maxLength(100)],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'roadtrip-registration',
  validate: formValidation,
})(RoadtripRegistration));
