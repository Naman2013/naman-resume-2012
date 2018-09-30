import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from '../app/components/common/pagination';
import PaginateStories from '../app/components/common/paginate-stories';

storiesOf('Pagination', module)
  .add('Pagination component', () => (
    <Pagination />
  ))
  .add('Paginate stories API', () => (
    <PaginateStories />
  ));
