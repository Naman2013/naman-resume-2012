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

  state = { totalPageCount: 10 }

  handleServiceResponse = (resp) => {
    this.props.onServiceResponse(resp);

    // TODO: refactor, this is too brittle...
    this.setState({ totalPageCount: resp.pages });
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
        render={() => (
          <Pagination
            totalPageCount={this.state.totalPageCount}
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
