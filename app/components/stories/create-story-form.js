import React from 'react'
import { Field, reduxForm } from 'redux-form'
import InputField from 'components/form/InputField';
import TextareaField from 'components/form/TextareaField';
import { createValidator, required, maxLength } from 'modules/utils/validation';
import styles from './create-story-form.style';

const CreateStoryForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    submitStory,
  } = props
  return (
    <form onSubmit={handleSubmit(submitStory)}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="male"
            />{' '}
            Male
          </label>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="female"
            />{' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      <style jsx>{styles}</style>
    </form>
  )
}

const loginValidation = createValidator({
  firstName: [required, maxLength(30)],
  lastName: [required, maxLength(50)],
  emailAddress: [required, maxLength(150)],
  message: [required, maxLength(1800)],
  subject: [maxLength(100)],
});

export default reduxForm({
  form: 'createStory',
  validate: loginValidation,
})(CreateStoryForm)
