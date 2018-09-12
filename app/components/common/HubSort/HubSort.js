import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'components/common/DropDown';
import findIndex from 'lodash/findIndex';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import Dots from 'atoms/icons/Dots';
import { astronaut } from 'styles/variables/colors_tiles_v4';
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
    mobileDropdownIsShowing: false,
  }

  selectSort = (e, selectedItem) => {
    if (e) e.preventDefault();
    const { handleSort, sortItems } = this.props;
    this.setState(() => ({
      activeIndex: findIndex(sortItems, sorItem => sorItem.value === selectedItem.value),
    }));

    handleSort(selectedItem.value);
  }

  toggleMobileDropdown = () => {
    this.setState(state => ({
      mobileDropdownIsShowing: !state.mobileDropdownIsShowing,
    }));
  }

  render() {
    const { sortItems } = this.props;
    const { activeIndex, mobileDropdownIsShowing } = this.state;
    return (
      <Fragment>
        <div className="root">
          <DisplayAtBreakpoint
            screenMedium
            screenLarge
            screenXLarge
          >
            <DropDown
              handleSelect={this.selectSort}
              selectedIndex={activeIndex}
              options={sortItems}
              placeholder="Sort Options"
            />
          </DisplayAtBreakpoint>

          <DisplayAtBreakpoint
            screenSmall
          >
            <div className="context-container">
              {mobileDropdownIsShowing ? null : <div
                className="dots-container"
                onClick={this.toggleMobileDropdown}
              >
                <Dots
                  theme={{ circleColor: astronaut }}
                />
              </div>}
              {mobileDropdownIsShowing ?
                <div
                  className="sort-dropdown-container"
                >
                  <DropDown
                    handleSelect={this.selectSort}
                    selectedIndex={activeIndex}
                    options={sortItems}
                    placeholder="Sort Options"
                  />
                </div>
              : null}
            </div>
          </DisplayAtBreakpoint>
        </div>
        <style jsx>{style}</style>
      </Fragment>
    )
  }
}



export default HubSort;
