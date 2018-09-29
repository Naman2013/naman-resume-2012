import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from '../app/components/common/pagination';

storiesOf('Pagination', module)
  .add('Default', () => (
    <Pagination />
  ));
