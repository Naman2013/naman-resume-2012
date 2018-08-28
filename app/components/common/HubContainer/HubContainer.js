import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
    location: {
      query: {},
    },
  };

  state = {
    filter: this.props.location.query.filter || 'all',
    page: this.props.location.query.page || 1,
    sort: this.props.location.query || 'aToZ',
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
      this.setState(() => ({
        filter,
        page,
        sort,
      }));
    }
  }

  handleClick = (idx) => {

  }

  render() {
    const {
      hubTitle,
    } = this.props;

    const { activeIndex } = this.state;

    return (
      <div className="root">
        <HubHeader
          icon="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
          title={hubTitle}
          renderNav={() => (<UnderlineNav navItems={[]} />)}
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
