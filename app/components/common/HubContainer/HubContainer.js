import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import noop from 'lodash/noop';
import HubHeader from 'app/components/common/HubHeader';
import HubSort from 'app/components/common/HubSort';
import ShowMoreWithNetwork from 'app/components/common/show-more-with-network';
import UnderlineNav from 'app/components/common/UnderlineNav';
import PaginateWithNetwork from 'app/components/common/paginate-with-network';
import { goldCompass } from 'app/styles/variables/iconURLs';
import classnames from 'classnames';

import style from './HubContainer.style';

const { arrayOf, bool, shape, string, func } = PropTypes;

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
    filterOptions: arrayOf(
      shape({
        label: string,
        value: string,
      })
    ),
    filterTypeFieldName: string,
    paginateURL: string,
    filterType: string,
    sortOptions: arrayOf(
      shape({
        label: string,
        value: string,
      })
    ),
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
    showHeaderIcon: bool,
    pageTitleTheme: shape({}),
    callSource: string,
    hubActions: shape({}),
    profile: bool,
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
    plain: false,
  };

  state = {
    page: this.props.location.query.page || 1,
    sort: this.props.location.query.sort || 'atoz',
    defaultSortIndex: getDefaultIndex(
      this.props.sortOptions,
      this.props.location.query.sort || 'atoz'
    ),
    toggleMobileSort: false,
    scrollTop: 0,
    isFetching: false
  };

  componentWillReceiveProps(nextProps) {
    const { sort } = this.props.location.query;
    const { sort: nextSort } = nextProps.location.query;
    const { isFetching } = this.props;
    const { isFetching: nextIsFetching } = nextProps;

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

    if (isFetching !== nextIsFetching) {
      this.setState({
        isFetching: nextIsFetching,
      });
    }
  }

  componentDidUpdate(prevState) {
    const { isFetching, scrollTop } = this.state;
    const { isFetching: prevIsFetching } = prevState;
    if (isFetching !== prevIsFetching && !isFetching) {
      window.scrollTo(0, scrollTop);
    }
  }

  componentWillUnmount = () => {
    this.props.clearTiles();
  };

  setQueryParams = query => {
    const params = queryString.stringify(query);
    const { filterType, hubName } = this.props;
    browserHistory.push({
      pathname: filterType ? `/${hubName}/${filterType}` : `/${hubName}`,
      search: `?${params}`,
    });
  };

  handleSortChange = sort => {
    this.setState(state => {
      const query = Object.assign({}, state, { sort });
      this.setQueryParams(pick(query, QUERY_TYPES));
      return {
        sort,
      };
    });
  };

  handlePaginationResponse = resp => {
    const { hubActions, updateList } = this.props;
    if (!resp.apiError) {
      hubActions.hubGetRequestSuccess();
      updateList(resp);
    } else {
      hubActions.hubGetRequestError();
    }
  };

  handlePaginationChange = ({ activePage }) => {
    this.setState(state => {
      const query = Object.assign({}, state, { page: activePage });
      this.setQueryParams(pick(query, QUERY_TYPES));
      return {
        page: activePage,
        scrollTop: window.pageYOffset || document.documentElement.scrollTop,
      };
    });
  };

  handleShowMoreResponse = resp => {
    const { hubActions, appendToList } = this.props;
    if (!resp.apiError) {
      hubActions.hubGetRequestSuccess();
      appendToList(resp);
    } else {
      hubActions.hubGetRequestError();
    }
  };

  toggleMobileSort = () => {
    this.setState({
      toggleMobileSort: true
    });
  };

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
      profile,
      isFetching,
      leaveClub
    } = this.props;
   
    const { defaultSortIndex, sort, page, toggleMobileSort } = this.state;

    return (
      <div className="root">
        <HubHeader
          profile={profile}
          icon={iconURL}
          title={pageTitle}
          renderRightMenu={renderRightMenu}
          showIcon={showHeaderIcon}
          titleTheme={pageTitleTheme}
          renderNav={() => (
            <div className={classnames('navigation-bar', {toggle: toggleMobileSort})}>
              <UnderlineNav
                profile={profile}
                activeFilter={filterType}
                activeSort={sort}
                navItems={filterOptions}
                parentPath={hubName}
              />
              {!this.props.isCreateMode && useSort && filterType !== "myquests" ? (
                <HubSort
                  defaultIndex={defaultSortIndex}
                  handleSort={this.handleSortChange}
                  toggleMobileSort={this.toggleMobileSort}
                  sortItems={sortOptions}
                />
              ) : null}
            </div>
          )}
        />
        <div>
          {render()}
          {!this.props.isCreateMode && filterType !== "myquests" ? (
            <div className="pagination-container">
              {!isMobile ? (
                <PaginateWithNetwork
                  apiURL={paginateURL}
                  leaveClub={leaveClub}
                  activePageNumber={Number(page)}
                  onServiceResponse={this.handlePaginationResponse}
                  onPaginationChange={this.handlePaginationChange}
                  hubActions={hubActions}
                  filterOptions={{
                    ...(useSort ? { sortBy: sort } : {}),
                    page,
                    count: 9,
                    [filterTypeFieldName]: filterType,
                    callSource,
                  }}
                />
              ) : (
                <ShowMoreWithNetwork
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
                    callSource,
                  }}
                />
              )}
            </div>
          ) : null}
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default HubContainer;
