/***********************************
* V4 ShowMore
*   Use when you want to paginate on the front end (API returning pages)
*   appends new set to previous set
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import Button from 'components/common/style/buttons/Button';

const {
  any,
  arrayOf,
  func,
  string,
  number,
  oneOfType,
} = PropTypes;

class ShowMore extends Component {

  static propTypes = {
    currentCount: number,
    page: number,
    totalCount: oneOfType([string, number]),
    handleShowMore: func.isRequired,
  }

  static defaultProps = {
    currentCount: 10,
    page: 1,
    totalCount: 0,
  }

  state = {
    page: this.props.defaultPage,
  }

  showMore = (e) => {
    e.preventDefault();
    const { page, handleShowMore } = this.props;
    return handleShowMore(Number(page) + 1);
  };

  render() {
    const {
      buttonText,
      currentCount,
      page,
      totalCount,
    } = this.props;
    const remaining = Number(totalCount) - currentCount;
    return (
      <div>
        {remaining > 0 ? <Button text={`Show More (${remaining})`} onClickEvent={this.showMore} theme={{ margin: '15px auto' }}/> : null}
      </div>
    )
  }
}

export default ShowMore;
