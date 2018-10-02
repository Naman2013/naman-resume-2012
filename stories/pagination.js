import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import Pagination from '../app/components/common/pagination';
import PaginateWithNetwork from '../app/components/common/paginate-with-network';

const stories = storiesOf('Pagination', module).addDecorator(withKnobs);
const pagesPerPage = number('pagesPerPage', 4);
stories.add('Pagination component', () => (
  <Pagination activePage={1} />
)).add('Paginate stories API', () => (
  <PaginateWithNetwork />
));
