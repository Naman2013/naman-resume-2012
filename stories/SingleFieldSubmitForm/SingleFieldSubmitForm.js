import React from 'react';
import { storiesOf } from '@storybook/react';
import noop from 'lodash/noop';
import SingleFieldSubmitForm from '../../app/components/common/SingleFieldSubmitForm';

storiesOf('SingleFieldSubmitForm', module)
  .add('Renders a submit form with a single text area', () => (
    <SingleFieldSubmitForm
      submitForm={noop()}
    />
  ));
