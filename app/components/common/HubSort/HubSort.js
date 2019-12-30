import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'app/components/common/DropDown';
import findIndex from 'lodash/findIndex';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import classnames from 'classnames';
import Dots from 'app/atoms/icons/Dots';
import style from './HubSort.style';
import './styles.scss';

const { arrayOf, func, shape, string, number, oneOfType } = PropTypes;

class HubSort extends Component {
  static propTypes = {
    defaultIndex: oneOfType([string, number]),
    handleSort: func.isRequired,
    toggleMobileSort: func.isRequired,
    sortItems: arrayOf(
      shape({
        label: string,
        value: string,
      })
    ),
  };

  static defaultProps = {
    defaultIndex: 0,
    sortItems: [],
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    activeIndex: this.props.defaultIndex,
    mobileDropdownIsShowing: false,
  };

  selectSort = (e, selectedItem) => {
    if (e) e.preventDefault();
    const { handleSort, sortItems } = this.props;
    this.setState(() => ({
      activeIndex: findIndex(
        sortItems,
        sorItem => sorItem.value === selectedItem.value
      ),
      mobileDropdownIsShowing: false,
    }));

    handleSort(selectedItem.value);
  };

  toggleMobileDropdown = () => {
    const { toggleMobileSort } = this.props;
    this.setState(state => ({
      mobileDropdownIsShowing: !state.mobileDropdownIsShowing,
    }));
    toggleMobileSort();
  };

  render() {
    const { sortItems } = this.props;
    const { activeIndex, mobileDropdownIsShowing } = this.state;
    return (
      <Fragment>
        <div className="root hub-sort">
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <DropDown
              handleSelect={this.selectSort}
              selectedIndex={activeIndex}
              options={sortItems}
              placeholder="Sort Options"
            />
          </DisplayAtBreakpoint>

          <DisplayAtBreakpoint screenSmall>
            <div
              className={classnames('context-container', {
                toggle: mobileDropdownIsShowing,
              })}
            >
              {mobileDropdownIsShowing ? null : (
                <div
                  className="dots-container"
                  onClick={this.toggleMobileDropdown}
                  role="presentation"
                >
                  <Dots theme={{ circleColor: astronaut }} />
                </div>
              )}
              {mobileDropdownIsShowing ? (
                <div className="sort-dropdown-container">
                  <DropDown
                    handleSelect={this.selectSort}
                    selectedIndex={activeIndex}
                    options={sortItems}
                    placeholder="Sort Options"
                  />
                </div>
              ) : null}
            </div>
          </DisplayAtBreakpoint>
        </div>
        <style jsx>{style}</style>
      </Fragment>
    );
  }
}

export default HubSort;
