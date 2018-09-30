import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from '../app/components/common/pagination';
import PaginateWithNetwork from '../app/components/common/paginate-with-network';

storiesOf('Pagination', module)
  .add('Pagination component', () => (
    <Pagination activePage={1} />
  ))
  .add('Paginate stories API', () => (
    <PaginateWithNetwork />
  ));
