import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import Pagination from '../pagination';

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

  handleServiceResponse = (resp) => {
    this.props.onServiceResponse(resp);
  }

  render() {
    const {
      apiURL,
      activePageNumber,
      filterOptions,
    } = this.props;

    return (
      <Request
        serviceURL={apiURL}
        requestBody={Object.assign({ page: activePageNumber }, filterOptions)}
        serviceResponseHandler={this.handleServiceResponse}
        render={({
          serviceResponse,
        }) => (
          <Pagination
            totalPageCount={serviceResponse.pages}
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
