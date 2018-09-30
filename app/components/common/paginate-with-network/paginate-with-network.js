import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import Pagination from '../pagination';

const PAGE_TYPES = ['all', 'artCulture', 'diy', 'humanSpirit', 'scienceLog'];
const SORT_OPTIONS = ['recent', 'likes', 'atoz', 'ztoa'];

// responsible for reporting the target page
// takes options, like filter type and sorting

class PaginateWithNetwork extends Component {
  static propTypes = {
    onServiceResponse: PropTypes.func,
    activePageNumber: PropTypes.number,
    filterOptions: PropTypes.shape(PropTypes.any),
    apiURL: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onServiceResponse: (resp) => { console.log(resp); },
    activePageNumber: 1,
    filterOptions: {},
  }

  state = {}

  render() {
    return (
      <Pagination />
    );
  }
}

export default PaginateWithNetwork;
