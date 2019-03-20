import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { NavLink, browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import noop from 'lodash/noop';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'app/components/common/HubHeader';
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
  number,
} = PropTypes;

const getDefaultIndex = (set, item) => {
  const idx = findIndex(set, setItem => setItem.value === item);
  return idx < 0 ? 0 : idx;
};

const QUERY_TYPES = ['sort', 'page'];

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
    filterTypeFieldName: string,
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
    isCreateMode: bool,
    clearTiles: func,
    useSort: bool,
    showHeaderIcon:bool,
    pageTitleTheme:shape({}),
    callSource: string,
    hubActions: shape({}),
  };

  static defaultProps = {
    filterType: 'all',
    pageTitle: '',
    filterTypeFieldName: 'type',
    paginateURL: null,
    iconURL: goldCompass,
    filterOptions: [],
    sortOptions: [],
    location: {
      query: {},
    },
    user: {},
    isMobile: false,
    isCreateMode: false,
    responseFieldNames: {},
    validateResponseAccess: noop,
    clearTiles: noop,
    useSort: true,
    showHeaderIcon: true,
    pageTitleTheme: {},
    callSource: '',
    hubActions: { 
      hubGetRequestStart: () => {},
      hubGetRequestError: () => {},
    },
  };

  state = {
    page: this.props.location.query.page || 1,
    sort: this.props.location.query.sort || 'atoz',
    defaultSortIndex: getDefaultIndex(this.props.sortOptions, this.props.location.query.sort || 'atoz'),
  }

  componentWillReceiveProps(nextProps) {
    const { sort } = this.props.location.query;
    const { sort: nextSort } = nextProps.location.query;

    if (this.props.filterType !== nextProps.filterType) {
      this.props.clearTiles();
      this.setState({
        page: 1,
      });
    }

    if (sort !== nextSort) {
      this.props.clearTiles();
      this.setState({ sort: nextSort });
    }
  }

  componentWillUnmount = () => {
    this.props.clearTiles();
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
    const { hubActions, updateList } = this.props;
    if (!resp.apiError) {
      hubActions.hubGetRequestSuccess();
      updateList(resp);
    } else {
      hubActions.hubGetRequestError();
    }
  }

  handlePaginationChange = ({ activePage }) => {
    this.setState((state) => {
      const query = Object.assign({}, state, { page: activePage });
      this.setQueryParams(pick(query, QUERY_TYPES));
      return ({
        page: activePage,
      });
    });
  }

  handleShowMoreResponse = (resp) => {
    const { hubActions, appendToList } = this.props;
    if (!resp.apiError) {
      hubActions.hubGetRequestSuccess();
      appendToList(resp);
    } else {
      hubActions.hubGetRequestError();
    }
  }

  render() {
    const {
      callSource,
      filterOptions,
      filterType,
      filterTypeFieldName,
      hubName,
      iconURL,
      isMobile,
      pageTitle,
      pageTitleTheme,
      paginateURL,
      render,
      renderRightMenu,
      responseFieldNames,
      sortOptions,
      user,
      useSort,
      showHeaderIcon,
      hubActions,
    } = this.props;

    const {
      defaultSortIndex,
      sort,
      page,
    } = this.state;

    return (
      <div className="root">
        <HubHeader
          icon={iconURL}
          title={pageTitle}
          renderRightMenu={renderRightMenu}
          showIcon={showHeaderIcon}
          titleTheme={pageTitleTheme}
          renderNav={() => (
            <div className="navigation-bar">
              <UnderlineNav
                activeFilter={filterType}
                activeSort={sort}
                navItems={filterOptions}
                parentPath={hubName}
              />
              {(!this.props.isCreateMode && useSort) ?
                <HubSort
                  defaultIndex={defaultSortIndex}
                  handleSort={this.handleSortChange}
                  sortItems={sortOptions}
                /> : null}
            </div>
          )}
        />
        <div>
          {render()}
          {!this.props.isCreateMode ?
            <div className="pagination-container">
              {!isMobile ?
                <PaginateWithNetwork
                  apiURL={paginateURL}
                  activePageNumber={Number(page)}
                  onServiceResponse={this.handlePaginationResponse}
                  onPaginationChange={this.handlePaginationChange}
                  hubActions={hubActions}
                  filterOptions={{
                    ...(useSort ? { sortBy: sort } : {}),
                    page,
                    count: 9,
                    [filterTypeFieldName]: filterType,
                    callSource
                  }}
                />
              : <ShowMoreWithNetwork
                apiURL={paginateURL}
                activePageNumber={Number(page)}
                onServiceResponse={this.handleShowMoreResponse}
                onPaginationChange={this.handlePaginationChange}
                hubActions={hubActions}
                responseFieldNames={responseFieldNames}
                validateResponseAccess={this.validateResponseAccess}
                user={user}
                filterOptions={{
                  ...(useSort ? { sortBy: sort } : {}),
                  type: filterType,
                  count: 5,
                  [filterTypeFieldName]: filterType,
                  callSource
                }}
              />}
            </div> : null}
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default HubContainer;
