/***********************************
* V4 ShowMore Full Set
*   Use when you want to paginate on the front end (API returning full set)
*   takes fullData set and handleShowMore prop will recieve updated dataset
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
    fullDataSet: arrayOf(any),
    count: number,
    page: number,
    totalCount: number,
    handleShowMore: func.isRequired,
    idField: string,
    buttonText: arrayOf('string'),
  }

  static defaultProps = {
    fullDataSet: [],
    count: 10,
    page: 1,
    totalCount: 0,
    idField: 'replyId',
    buttonText: ['MORE REPLY', 'MORE REPLIES'],
  }

  showMore = (e) => {
    e.preventDefault();
    const {
      count,
      fullDataSet,
      handleShowMore,
      idField,
      page,
      totalCount,
    } = this.props;
    const amountDisplayed = (count * page);
    const updatedDataSet = take(fullDataSet, amountDisplayed + count)
      .map(item => item[idField]);
    return handleShowMore(updatedDataSet, (page + 1));
  };

  render() {
    const {
      buttonText,
      count,
      page,
      totalCount,
    } = this.props;
    const remaining = totalCount - (count * page);
    return (
      <div>
        {remaining > 0 ? <Button text={`${remaining} ${remaining > 1 ? buttonText[1]: buttonText[0]}`} onClickEvent={this.showMore} /> : null}
      </div>
    )
  }
}

export default ShowMoreFullSet;
