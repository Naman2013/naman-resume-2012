/***********************************
 * V4 PhotoHubNavigation
 *  Navigation bar for private profile photos
 ***********************************/

import { FilterDropdown } from 'app/modules/profile-photos/components/filter-dropdown';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, browserHistory, withRouter } from 'react-router';
import findIndex from 'lodash/findIndex';
import { searchAstronaut } from 'app/styles/variables/iconURLs';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import Dots from 'app/atoms/icons/Dots';
import DropDown from 'app/components/common/DropDown';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import Button from 'app/components/common/style/buttons/Button';

import style from './PhotoHubNavigation.style';

const getFilterDropdownOptions = t => [
  {
    label: t('Photos.AllObservations'),
    value: 'all',
  },
  {
    label: t('Photos.MostRecent'),
    value: 'recent',
  },
  {
    label: t('Photos.MostPopular'),
    value: 'popular',
  },
  {
    label: t('Photos.SavedForLater'),
    value: 'saved',
  },
];

@withTranslation()
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
    optionLabel: 'Options', // t('Photos.Options'),
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
    const { t } = this.props;
    this.setState({
      optionLabel: selectedOption.label,
      filtersActiveIndex: findIndex(
        getFilterDropdownOptions(t),
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

    const { t } = this.props;

    const dropdownOptions = generatedNavItems.map(item => ({
      label: item.name,
      value: item.linkUrl,
    }));

    return (
      <div className="photohub-root">
        <div className="header">
          <div className="photohub-title">{t('Photos.MyPhotoHub')}</div>
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
