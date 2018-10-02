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
    filterOptions: PropTypes.shape({}),
    apiURL: PropTypes.string.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onServiceResponse: (resp) => { console.log(resp); },
    activePageNumber: 1,
    filterOptions: {},
  }

  state = {}

  render() {
    const {
      apiURL,
      activePageNumber,
      filterOptions,
      onServiceResponse,
    } = this.props;

    return (
      <Request
        serviceURL={apiURL}
        requestBody={Object.assign({ page: activePageNumber }, filterOptions)}
        serviceResponseHandler={onServiceResponse}
        render={() => (
          <Pagination
            activePage={activePageNumber}
            pagesPerPage={4}
            onPageChange={this.props.onPaginationChange}
          />
        )}
      />
    );
  }
}

export default PaginateWithNetwork;
