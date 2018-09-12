import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link, browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'components/common/HubHeader';
import HubSort from 'components/common/HubSort';
import UnderlineNav from 'components/common/UnderlineNav';
import { seashell } from 'styles/variables/colors_tiles_v4';
import style from './HubContainer.style';

const {
  number,
  arrayOf,
  shape,
  string,
  func,
} = PropTypes;

const getDefaultIndex = (set, item) => {
  const idx = findIndex(set, setItem => setItem.value === item);
  return idx < 0 ? 0 : idx;
};

const QUERY_TYPES = ['sort', 'filter', 'page'];

class HubContainer extends Component {
  static propTypes = {
    hubTitle: string,
    filterOptions: arrayOf(shape({
      label: string,
      value: string,
    })),
    sortOptions: arrayOf(shape({
      label: string,
      value: string,
    })),
    location: shape({
      query: shape({
        filter: string,
        page: string,
        sort: string,
      }),
    }),
  };

  static defaultProps = {
    hubTitle: '',
    filterOptions: [],
    sortOptions: [],
    location: {
      query: {},
    },
  };

  state = {
    filter: this.props.location.query.filter || '*',
    page: this.props.location.query.page || 1,
    sort: this.props.location.query.sort || 'asc',
    defaultFilterIndex: getDefaultIndex(this.props.filterOptions, this.props.location.query.filter || '*'),
    defaultSortIndex: getDefaultIndex(this.props.sortOptions, this.props.location.query.sort || 'asc'),
  }

  componentWillReceiveProps(nextProps) {
    let { filter, page, sort } = this.props.location.query;
    const { filter: nextFilter, page: nextPage, sort: nextSort } = nextProps.location.query;
    let changeState = false;

    if (filter !== nextFilter) {
      filter = nextFilter;
      changeState = true;
    }

    if (page !== nextPage) {
      page = nextPage;
      changeState = true;
    }

    if (sort !== nextSort) {
      sort = nextSort;
      changeState = true;
    }

    if (changeState) {
      this.setState(state => {
        this.setQueryParams({ filter, page, sort });
        return ({
          filter,
          page,
          sort,
        });
      });


    }
  }

  setQueryParams = (query) => {
    const params = queryString.stringify(query);
    browserHistory.push({
      pathname: '/guides',
      search: `?${params}`,
    });
  }

  handleFilterChange = (filter) => {
    this.setState((state) => {
      const query = Object.assign({}, state, { filter });
      this.setQueryParams(pick(query, QUERY_TYPES));
      return ({
        ...state,
        filter,
      });
    });
  }

  handleSortChange = (sort) => {
    this.setState((state) => {
      const query = Object.assign({}, state, { sort });
      this.setQueryParams(pick(query, QUERY_TYPES));
      return ({
        ...state,
        sort,
      });
    });
  }

  render() {
    const {
      filterOptions,
      hubTitle,
      sortOptions,
    } = this.props;

    const {
      defaultFilterIndex,
      defaultSortIndex,
    } = this.state;
    return (
      <div className="root">
        <HubHeader
          icon="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
          title={hubTitle}
          renderNav={() => (
            <div className="navigation-bar">
              <UnderlineNav
                defaultIndex={defaultFilterIndex}
                navItems={filterOptions}
                onItemClick={this.handleFilterChange}
              />
              <HubSort
                defaultIndex={defaultSortIndex}
                handleSort={this.handleSortChange}
                sortItems={sortOptions}
              />
            </div>
          )}
        />
        <CenterColumn
          theme={{ backgroundColor: seashell }}
        >
        </CenterColumn>
        <style jsx>{style}</style>
      </div>
    )
  }
}



export default HubContainer;
