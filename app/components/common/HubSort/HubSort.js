import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'components/common/DropDown';
import findIndex from 'lodash/findIndex';
import style from './HubSort.style';

const {
  arrayOf,
  func,
  shape,
  string,
  number,
  oneOfType,
} = PropTypes;

class HubSort extends Component {
  static propTypes = {
    defaultIndex: oneOfType([string, number]),
    handleSort: func.isRequired,
    sortItems: arrayOf(shape({
      label: string,
      value: string,
    })),
  };

  static defaultProps = {
    defaultIndex: 0,
    sortItems: [],
  };

  state = {
    activeIndex: this.props.defaultIndex,
  }

  selectSort = (e, selectedItem) => {
    if (e) e.preventDefault();
    const { handleSort, sortItems } = this.props;
    this.setState(() => ({
      activeIndex: findIndex(sortItems, sorItem => sorItem.value === selectedItem.value),
    }));

    handleSort(selectedItem.value);
  }

  render() {
    const { sortItems } = this.props;
    const { activeIndex } = this.state;
    return (
      <Fragment>
        <div className="root">
          <DropDown
            handleSelect={this.selectSort}
            selectedIndex={activeIndex}
            options={sortItems}
            placeholder="Sort Options"
          />
        </div>
        <style jsx>{style}</style>
      </Fragment>
    )
  }
}



export default HubSort;
