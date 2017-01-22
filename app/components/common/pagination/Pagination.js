import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import styles from './Pagination.scss';

class Pagination extends Component {

  static calculatePageCount({ itemsPerPage, maxItems }) {
    return Math.ceil(maxItems / itemsPerPage);
  }

  static generateRangeText({ startRange, itemsPerPage }) {
    const modifiedStartRange = startRange < 1 ? 1 : startRange;
    return `${modifiedStartRange}-${startRange + itemsPerPage}`;
  }

  constructor(props) {
    super(props);

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  handleNextClick(event) {
    event.preventDefault();
    const { canNext, handleNextPageClick } = this.props;
    if (canNext) {
      handleNextPageClick();
    }
  }

  handlePreviousClick(event) {
    event.preventDefault();
    const { canPrevious, handlePreviousPageClick } = this.props;
    if (canPrevious) {
      handlePreviousPageClick();
    }
  }

  render() {
    const {
      currentRange,
      totalCount,
      canNext,
      canPrevious,
    } = this.props;

    const nextButtonClassnames = classnames('button next', {
      active: canNext,
    });

    const previousButtonClassnames = classnames('button previous', {
      active: canPrevious,
    });

    return (
      <div className={styles.myPicturesControl}>
        <button onClick={this.handlePreviousClick} className={previousButtonClassnames}><span className="icon fa fa-chevron-left" /> Previous</button>
        <div className="count">{currentRange} of {totalCount}</div>
        <button onClick={this.handleNextClick} className={nextButtonClassnames}> Next <span className="icon fa fa-chevron-right" /></button>
      </div>
    );
  }
}

Pagination.defaultProps = {
  pageCount: '0',
  currentRange: '0-0',
  totalCount: 0,
  handlePreviousPageClick: _.noop,
  handleNextPageClick: _.noop,
  canNext: true,
  canPrevious: true,
};

Pagination.propTypes = {
  pageCount: PropTypes.string,
  currentRange: PropTypes.string,
  totalCount: PropTypes.number,
  handleNextPageClick: PropTypes.func,
  handlePreviousPageClick: PropTypes.func,
  canNext: PropTypes.bool,
  canPrevious: PropTypes.bool,
};

export default Pagination;
