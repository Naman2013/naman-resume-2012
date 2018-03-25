/***********************************
* V4 Paginate Full Set
*   Use when you want to paginate on the front end (API returning full set)
*   Wrapper for rc-pagination
*   takes fullData set and handlePageChange prop will recieve updated dataset
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';

const {
  any,
  arrayOf,
  func,
  number,
} = PropTypes;

class PaginateFullSet extends Component {

  static propTypes = {
    fullDataSet: arrayOf(any),
    count: number,
    page: number,
    totalCount: number,
    handlePageChange: func.isRequired,
  }

  static defaultProps = {
    fullDataSet: [],
    count: 10,
    page: 1,
    totalCount: 0,
  }

  constructor(props) {
    super(props);
  }

  onChange = (page) => {
    const {
      fullDataSet,
      handlePageChange,
      count,
      totalCount,
    } = this.props;
    const endIndex = (count*page);
    const startIndex = (endIndex-count);
    const updatedDataSet = fullDataSet
      .slice(startIndex, endIndex)
      .map(item => item.replyId);

    return handlePageChange(updatedDataSet, page);
  };

  render() {
    const {
      count,
      page,
      totalCount,
    } = this.props;
    return (
      <Pagination
        onChange={this.onChange}
        defaultPageSize={count}
        current={page}
        total={totalCount}
      />
    )
  }
}

export default PaginateFullSet;
