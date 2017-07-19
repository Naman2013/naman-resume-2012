import React from 'react';
import { storiesOf } from '@storybook/react';
import SectionHeader from '../../app/components/common/headers/SectionHeader';

storiesOf('Section header', module)
  .add('With some text', () => <SectionHeader title="Section title" />);
