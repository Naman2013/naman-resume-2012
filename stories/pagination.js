import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import store from '../app/store';
import Pagination from '../app/components/common/pagination';
import PaginateWithNetwork from '../app/components/common/paginate-with-network';

import { GET_STORIES } from '../app/services/content';


const PAGE_TYPES = ['all', 'artCulture', 'diy', 'humanSpirit', 'scienceLog'];
const SORT_OPTIONS = ['recent', 'likes', 'atoz', 'ztoa'];

const stories = storiesOf('Pagination', module);
stories.add('Pagination component', () => (
  <Pagination activePage={1} />
)).add('Paginate stories API', () => (
  <Provider store={store}>
    <PaginateWithNetwork
      apiURL={GET_STORIES}
      filterOptions={{
        sortBy: SORT_OPTIONS[0],
        page: 1,
      }}
    />
  </Provider>
));
