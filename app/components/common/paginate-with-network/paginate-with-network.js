import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import Pagination from '../pagination';

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
    const { apiURL, activePageNumber, filterOptions } = this.props;

    return (
      <Request
        serviceURL={apiURL}
        requestBody={filterOptions}
        render={() => (
          <Pagination
            activePage={activePageNumber}
            pagesPerPage={4}
          />
        )}
      />
    );
  }
}

export default PaginateWithNetwork;
