import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import Pagination from '../pagination';

class PaginateWithNetwork extends Component {
  static propTypes = {
    onServiceResponse: PropTypes.func,
    activePageNumber: PropTypes.number,
    filterOptions: PropTypes.shape({}),
    apiURL: PropTypes.string.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
    hubActions: PropTypes.shape({}),
  };

  static defaultProps = {
    onServiceResponse: resp => {},
    activePageNumber: 1,
    filterOptions: {},
    hubActions: { hubGetRequestStart: () => {} },
  };

  handleServiceResponse = resp => {
    this.props.onServiceResponse(resp);
    window.scrollTo(0, 0);
  };

  serviceFetchStartHandler = () => {
    const { hubActions } = this.props;
    if (hubActions) hubActions.hubGetRequestStart();
  };

  render() {
    const { apiURL, activePageNumber, filterOptions, hubActions,leaveClub } = this.props;


    return (
      <Request
        withoutUser
        serviceURL={apiURL}
        leaveClub={leaveClub}
        requestBody={Object.assign({ page: activePageNumber }, filterOptions)}
        serviceResponseHandler={this.handleServiceResponse}
        serviceFetchStartHandler={this.serviceFetchStartHandler}
        hubActions={hubActions}
        render={({ fetchingContent, serviceResponse }) =>
          !fetchingContent && (
            <Pagination
              totalPageCount={serviceResponse.pages}
              activePage={activePageNumber}
              pagesPerPage={4}
              onPageChange={this.props.onPaginationChange}
            />
          )
        }
      />
    );
  }
}

export default PaginateWithNetwork;
