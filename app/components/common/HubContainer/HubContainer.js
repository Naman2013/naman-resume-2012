import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { NavLink, browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import noop from 'lodash/noop';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'components/common/HubHeader';
import HubSort from 'components/common/HubSort';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import UnderlineNav from 'components/common/UnderlineNav';
import PaginateWithNetwork from 'components/common/paginate-with-network';
import { seashell } from 'styles/variables/colors_tiles_v4';
import { goldCompass } from 'styles/variables/iconURLs';

import style from './HubContainer.style';

const {
  arrayOf,
  bool,
  shape,
  string,
  func,
} = PropTypes;

const getDefaultIndex = (set, item) => {
  const idx = findIndex(set, setItem => setItem.value === item);
  return idx < 0 ? 0 : idx;
};

const QUERY_TYPES = ['sort'];

class HubContainer extends Component {
  static propTypes = {
    updateList: func.isRequired,
    appendToList: func.isRequired,
    pageTitle: string,
    validateResponseAccess: func,
    filterOptions: arrayOf(shape({
      label: string,
      value: string,
    })),
    paginateURL: string,
    filterType: string,
    sortOptions: arrayOf(shape({
      label: string,
      value: string,
    })),
    iconURL: string,
    location: shape({
      query: shape({
        filter: string,
        page: string,
        sort: string,
      }),
    }),
    user: shape({}),
    responseFieldNames: shape({
      currentCount: string,
      totalCount: string,
    }),
    isMobile: bool,
  };

  static defaultProps = {
    filterType: 'all',
    pageTitle: '',
    paginateURL: null,
    iconURL: goldCompass,
    filterOptions: [],
    sortOptions: [],
    location: {
      query: {},
    },
    user: {},
    isMobile: false,
    responseFieldNames: {},
    validateResponseAccess: noop,
  };

  state = {
    page: 1,
    sort: this.props.location.query.sort || 'atoz',
    defaultSortIndex: getDefaultIndex(this.props.sortOptions, this.props.location.query.sort || 'atoz'),
  }

  componentWillReceiveProps(nextProps) {
    let { sort } = this.props.location.query;
    const { sort: nextSort } = nextProps.location.query;
    let changeState = false;


    if (sort !== nextSort) {
      sort = nextSort;
      changeState = true;
    }

    if (changeState) {
      this.setState(() => ({ sort }));
      this.setQueryParams({ sort });
    }
  }

  setQueryParams = (query) => {
    const params = queryString.stringify(query);
    const { filterType, hubName } = this.props;
    browserHistory.push({
      pathname: filterType ? `/${hubName}/${filterType}` : `/${hubName}`,
      search: `?${params}`,
    });
  }

  handleSortChange = (sort) => {
    this.setState((state) => {
      const query = Object.assign({}, state, { sort });
      this.setQueryParams(pick(query, QUERY_TYPES));
      return ({
        sort,
      });
    });
  }

  handlePaginationResponse = (resp) => {
    if (!resp.apiError)
    this.props.updateList(resp);
  }

  handlePaginationChange = ({ activePage }) => {
    this.setState((state) => {
      // TODO: preserve page in query params
      // const query = Object.assign({}, state, { page: activePage });
      // this.setQueryParams(pick(query, QUERY_TYPES));
      return ({
        page: activePage,
      });
    });
  }

  handleShowMoreResponse = (resp) => {
    if (!resp.apiError)
    this.props.appendToList(resp);
  }

  render() {
    const {
      filterOptions,
      filterType,
      hubName,
      iconURL,
      isMobile,
      pageTitle,
      paginateURL,
      render,
      responseFieldNames,
      sortOptions,
      user,
    } = this.props;

    const {
      defaultSortIndex,
      sort,
      page
    } = this.state;
    return (
      <div className="root">
        <HubHeader
          icon={iconURL}
          title={pageTitle}
          renderNav={() => (
            <div className="navigation-bar">
              <UnderlineNav
                activeFilter={filterType}
                navItems={filterOptions}
                parentPath={hubName}
              />
              <HubSort
                defaultIndex={defaultSortIndex}
                handleSort={this.handleSortChange}
                sortItems={sortOptions}
              />
            </div>
          )}
        />
        <div>
          {render()}

            <div className="pagination-container">
              {!isMobile ?
                <PaginateWithNetwork
                  apiURL={paginateURL}
                  activePageNumber={Number(page)}
                  onServiceResponse={this.handlePaginationResponse}
                  onPaginationChange={this.handlePaginationChange}
                  filterOptions={{
                    sortBy: sort,
                    page,
                    type: filterType,
                  }}
                />
              : <ShowMoreWithNetwork
                  apiURL={paginateURL}
                  activePageNumber={Number(page)}
                  onServiceResponse={this.handleShowMoreResponse}
                  onPaginationChange={this.handleShowMoreChange}
                  responseFieldNames={responseFieldNames}
                  validateResponseAccess={this.validateResponseAccess}
                  user={user}
                  filterOptions={{
                    sortBy: sort,
                    type: filterType,
                    count: 5,
                  }}
              />}
            </div>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default HubContainer;
