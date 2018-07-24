import React from 'react';
import { storiesOf } from '@storybook/react';
import noop from 'lodash/noop';
import RevealSubmitForm from '../../app/components/common/RevealSubmitForm';

storiesOf('RevealSubmitForm', module)
  .add('Renders a submit form when a fake submit form is clicked', () => (
    <RevealSubmitForm
      submitForm={noop()}
    />
  ));
