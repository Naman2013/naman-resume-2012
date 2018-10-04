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
} = PropTypes;

class ShowMoreFullSet extends Component {

  static propTypes = {
    currentCount: number,
    defaultPage: number,
    totalCount: number,
    handleShowMore: func.isRequired,
  }

  static defaultProps = {
    currentCount: 10,
    defaultPage: 1,
    totalCount: 0,
  }

  state = {
    page: this.props.defaultPage,
  }

  showMore = (e) => {
    e.preventDefault();
    const {
      currentCount,
      handleShowMore,
      totalCount,
    } = this.props;
    const { page } = this.state;
    const amountDisplayed = (count * page);
    const updatedDataSet = take(fullDataSet, amountDisplayed + count)
      .map(item => item[idField]);
    return handleShowMore(updatedDataSet, (page + 1));
  };

  render() {
    const {
      buttonText,
      currentCount,
      page,
      totalCount,
    } = this.props;
    const remaining = totalCount - (currentCount * page);
    return (
      <div>
        {remaining > 0 ? <Button text={`Show More(${remaining})`} onClickEvent={this.showMore} /> : null}
      </div>
    )
  }
}

export default ShowMoreFullSet;
