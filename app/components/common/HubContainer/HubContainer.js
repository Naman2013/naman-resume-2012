import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { NavLink, browserHistory } from 'react-router';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'components/common/HubHeader';
import HubSort from 'components/common/HubSort';
import UnderlineNav from 'components/common/UnderlineNav';
import { seashell } from 'styles/variables/colors_tiles_v4';
import { goldCompass } from 'styles/variables/iconURLs';

import style from './HubContainer.style';

const {
  arrayOf,
  shape,
  string,
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
  };

  static defaultProps = {
    filterType: null,
    hubTitle: '',
    iconURL: goldCompass,
    filterOptions: [],
    sortOptions: [],
    location: {
      query: {},
    },
  };

  state = {
    page: this.props.location.query.page || 1,
    sort: this.props.location.query.sort || 'asc',
    defaultSortIndex: getDefaultIndex(this.props.sortOptions, this.props.location.query.sort || 'asc'),
  }

  componentWillReceiveProps(nextProps) {
    let { page, sort } = this.props.location.query;
    const { page: nextPage, sort: nextSort } = nextProps.location.query;
    let changeState = false;

    if (page !== nextPage) {
      page = nextPage;
      changeState = true;
    }

    if (sort !== nextSort) {
      sort = nextSort;
      changeState = true;
    }

    if (changeState) {
      this.setState({ page, sort });
      this.setQueryParams({ page, sort });
    }
  }

  setQueryParams = (query) => {
    const params = queryString.stringify(query);
    browserHistory.push({
      pathname: '/guides',
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

  render() {
    const {
      filterOptions,
      filterType,
      hubTitle,
      iconURL,
      render,
      sortOptions,
    } = this.props;

    const {
      defaultSortIndex,
    } = this.state;
    return (
      <div className="root">
        <HubHeader
          icon={iconURL}
          title={hubTitle}
          renderNav={() => (
            <div className="navigation-bar">
              <UnderlineNav
                activeFilter={filterType}
                navItems={filterOptions}
              />
              <HubSort
                defaultIndex={defaultSortIndex}
                handleSort={this.handleSortChange}
                sortItems={sortOptions}
              />
            </div>
          )}
        />
        <CenterColumn theme={{ backgroundColor: seashell }}>{render()}</CenterColumn>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default HubContainer;
