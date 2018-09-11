import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import noop from 'lodash/noop';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'components/common/HubHeader';
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

class HubContainer extends Component {
  static propTypes = {
    hubTitle: string,
    filterOptions: arrayOf(shape({
      name: string,
      filter: string,
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
    location: {
      query: {},
    },
  };

  state = {
    filter: this.props.location.query.filter || '*',
    page: this.props.location.query.page || 1,
    sort: this.props.location.query.sort || 'aToZ',
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
    this.setState(state => {
      const query = Object.assign({}, state, { filter });
      this.setQueryParams(query);
      return ({
        filter,
      });
    });
  }

  render() {
    const {
      hubTitle,
      filterOptions,
    } = this.props;
    return (
      <div className="root">
        <HubHeader
          icon="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
          title={hubTitle}
          renderNav={() => (
            <UnderlineNav
              navItems={filterOptions}
              onItemClick={this.handleFilterChange}
            />)}
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
