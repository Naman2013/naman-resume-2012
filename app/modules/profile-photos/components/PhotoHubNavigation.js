/***********************************
 * V4 PhotoHubNavigation
 *  Navigation bar for private profile photos
 ***********************************/

import { FilterDropdown } from 'app/modules/profile-photos/components/filter-dropdown';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory, withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import findIndex from 'lodash/findIndex';
import { searchAstronaut } from 'app/styles/variables/iconURLs';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import Dots from 'app/atoms/icons/Dots';
import DropDown from 'app/components/common/DropDown';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import Button from 'app/components/common/style/buttons/Button';

import messages from './PhotoHubNavigation.messages';
import style from './PhotoHubNavigation.style';

const filterDropdownOptions = [
  {
    label: <FormattedMessage {...messages.AllObservations} />,
    value: 'all',
  },
  {
    label: <FormattedMessage {...messages.MostRecent} />,
    value: 'recent',
  },
  {
    label: <FormattedMessage {...messages.MostPopular} />,
    value: 'popular',
  },
  {
    label: <FormattedMessage {...messages.SavedForLater} />,
    value: 'saved',
  },
];

class PhotoHubNavigation extends Component {
  state = {
    searchValue: '',
    searchActive: false,
    generatedNavItems: this.props.params.customerUUID
      ? this.props.publicProfile.profileMenuList.find(
          el => el.name === 'Photos'
        ).subMenus
      : this.props.privateProfile.profileMenuList.find(
          el => el.name === 'Photos'
        ).subMenus,
    activeIndex: 1,
    filterSelectActive: false,
    optionLabel: <FormattedMessage {...messages.Options} />,
    filtersActiveIndex: 0,
    mobileFilterActive: false,
  };

  handleSearchChange = e => this.setState({ searchValue: e.target.value });

  handleSearchClick = () =>
    this.setState({ searchActive: true }, () => this.input.focus());

  handleSearchSubmitByEnter = e => {
    if (e.key === 'Enter') {
    }
    // TODO: submit search
  };

  handleSearchBlur = () => {
    this.setState({ searchActive: false });
  };

  handleOptionsClick = () => this.setState({ filterSelectActive: true });

  handleFilterDropDownBlur = () => this.setState({ filterSelectActive: false });

  handleFilterMenuClose = () => this.setState({ filterSelectActive: false });

  handleDropDownItemClick = (e, selectedOption) => {
    this.setState(() => ({
      activeIndex: findIndex(
        this.state.generatedNavItems,
        navItem => navItem.link === selectedOption.value
      ),
    }));
    browserHistory.push(selectedOption.value);
  };

  handleFilterDropDownItemClick = (e, selectedOption) => {
    this.setState({
      optionLabel: selectedOption.label,
      filtersActiveIndex: findIndex(
        filterDropdownOptions,
        option => option.value === selectedOption.value
      ),
      filterSelectActive: false,
    });
  };

  handle3DotsClick = () => {
    this.setState({
      mobileFilterActive: true,
    });
  };

  handleNavItemClick = i => {
    this.setState({ activeIndex: i });
  };

  handleFilterChange = filter => {
    console.log('handleFilterChange', filter);
  };

  render() {
    const {
      activeIndex,
      filtersActiveIndex,
      searchActive,
      searchValue,
      filterSelectActive,
      optionLabel,
      mobileFilterActive,
      generatedNavItems,
    } = this.state;

    const {
      isFilterOpen,
      setFilterOpen,
      telescopeList,
      objectTypeList,
    } = this.props;

    const dropdownOptions = generatedNavItems.map(item => ({
      label: item.name,
      value: item.linkUrl,
    }));

    return (
      <div className="photohub-root">
        <div className="header">
          <div className="photohub-title">
            {<FormattedMessage {...messages.MyPhotoHub} />}
          </div>
          <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
            <div className="photohub-nav-bar">
              <div className="photohub-links">
                {generatedNavItems.map((item, i) => (
                  <div key={item.linkUrl} className="photohub-nav-block">
                    <Link
                      to={item.linkUrl}
                      activeClassName="photohub-nav-active"
                      className="photohub-nav-link"
                      onClick={() => this.handleNavItemClick(i)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="photohub-tools">
                <FilterDropdown
                  isOpen={isFilterOpen}
                  setOpen={setFilterOpen}
                  onChange={this.handleFilterChange()}
                  telescopeList={telescopeList}
                  objectTypeList={objectTypeList}
                />
                {/*
                {!filterSelectActive ? (
                  <Button
                    withIntl
                    onClickEvent={this.handleOptionsClick}
                    theme={{ marginLeft: '10px' }}
                    text={optionLabel}
                  />
                ) : (
                  <DropDown
                    handleMenuClose={this.handleFilterMenuClose}
                    handleBlur={this.handleFilterDropDownBlur}
                    handleSelect={this.handleFilterDropDownItemClick}
                    selectedIndex={filtersActiveIndex}
                    options={filterDropdownOptions}
                    autoFocus
                    defaultMenuIsOpen
                  />
                )}
*/}
                {!searchActive ? (
                  <Button
                    onClickEvent={this.handleSearchClick}
                    theme={{ marginLeft: '10px' }}
                    icon={searchAstronaut}
                  />
                ) : (
                  <input
                    type="text"
                    className="photo-hub-search-input-field"
                    onChange={this.handleSearchChange}
                    onBlur={this.handleSearchBlur}
                    onKeyPress={this.handleSearchSubmitByEnter}
                    value={searchValue}
                    ref={node => {
                      this.input = node;
                    }}
                  />
                )}
              </div>
            </div>
          </DisplayAtBreakpoint>
          <DisplayAtBreakpoint screenSmall>
            <div className="photohub-nav-bar">
              <div className="photohub-dropdown">
                {!mobileFilterActive && (
                  <DropDown
                    handleSelect={this.handleDropDownItemClick}
                    selectedIndex={activeIndex}
                    options={dropdownOptions}
                  />
                )}
              </div>
              <div className="photohub-tools">
                {!mobileFilterActive ? (
                  <Button
                    onClickEvent={this.handle3DotsClick}
                    renderIcon={() => (
                      <Dots theme={{ circleColor: astronaut }} />
                    )}
                  />
                ) : (
                  <DropDown
                    handleSelect={this.handleFilterDropDownItemClick}
                    selectedIndex={filtersActiveIndex}
                    options={filterDropdownOptions}
                  />
                )}
              </div>
            </div>
          </DisplayAtBreakpoint>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    privateProfile: state.profile.privateProfileData,
    publicProfile: state.profile.publicProfileData,
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(PhotoHubNavigation));
