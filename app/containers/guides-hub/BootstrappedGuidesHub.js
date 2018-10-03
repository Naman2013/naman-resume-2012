/***********************************
* V4 Guides Hub Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginateWithNetwork from 'components/common/paginate-with-network';
import { GUIDES_ENDPOINT_URL } from 'services/guides/guide-data';
import GuideTiles from 'components/guides-hub/guide-tiles';
import styles from './BootstrappedGuidesHub.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class BootstrappedGuidesHub extends Component {
  static propTypes = {
    guidesList: arrayOf(shape({})),
    page: oneOfType([number, string]),
  };
  static defaultProps = {
    guidesList: [],
    page: 1,
  };

  handlePaginationResponse(resp) {
    console.log(resp);
  }

  state = { currentPage: this.props.page }

  handlePaginationChange = ({ activePage }) => {
    this.setState({ currentPage: activePage });
  }

  render() {
    const {
      guidesList,
    } = this.props;
    const { currentPage } = this.state;
    console.log('rpos', this.props)

    return (
      <div className="root">
        <GuideTiles guides={guidesList} />
        <div className="pagination-container">
          <PaginateWithNetwork
            apiURL={GUIDES_ENDPOINT_URL}
            activePageNumber={currentPage}
            onServiceResponse={this.handlePaginationResponse}
            onPaginationChange={this.handlePaginationChange}
            filterOptions={{
              sortBy: 'recent',
              page: currentPage,
            }}
          />
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}


export default BootstrappedGuidesHub;
