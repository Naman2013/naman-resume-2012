import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import Pagination from '../pagination';

const PAGE_TYPES = ['all', 'artCulture', 'diy', 'humanSpirit', 'scienceLog'];
const SORT_OPTIONS = ['recent', 'likes', 'atoz', 'ztoa'];

// responsible for reporting the target page
// takes options, like filter type and sorting

const PaginateStories = ({
  onServiceResponse,
  pageNumber,
  filterOptions,
  apiURL,
}) => (
  <Pagination />
);

PaginateStories.propTypes = {
  onServiceResponse: PropTypes.func,
  activePageNumber: PropTypes.number,
  filterOptions: PropTypes.shape(PropTypes.any),
  apiURL: PropTypes.string.isRequired,
};

PaginateStories.defaultProps = {
  onServiceResponse: (resp) => { console.log(resp); },
  activePageNumber: 1,
  filterOptions: {},
};

export default PaginateStories;
