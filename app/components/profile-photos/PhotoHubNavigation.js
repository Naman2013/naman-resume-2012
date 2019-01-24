/***********************************
* V4 PhotoHubNavigation
*  Navigation bar for private profile photos
***********************************/

import React, { Component } from 'react';
import { Link, browserHistory, withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import findIndex from 'lodash/findIndex';
import DropDown from 'components/common/DropDown';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import Button from 'components/common/style/buttons/Button';
import { searchAstronaut } from 'styles/variables/iconURLs.js';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import Dots from 'atoms/icons/Dots';

import messages from './PhotoHubNavigation.messages';
import style from './PhotoHubNavigation.style';

const generatedNavItems = [
  {
    title: <FormattedMessage {...messages.PhotoRoll} />,
    link: '/profile/private/photos/photoroll',
  },
  {
    title: <FormattedMessage {...messages.Observations} />,
    link: '/profile/private/photos/observations',
  },
  {
    title: <FormattedMessage {...messages.Missions} />,
    link: '/profile/private/photos/missions',
  },
  {
    title: <FormattedMessage {...messages.Galleries} />,
    link: '/profile/private/photos/galleries',
  },
];

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
    activeIndex: findIndex(generatedNavItems, navItem => navItem.link === this.props.location.pathname),
    filterSelectActive: false,
    optionLabel: <FormattedMessage {...messages.Options} />,
    filtersActiveIndex: 0,
    mobileFilterActive: false,
  }

  handleSearchChange = e => this.setState({ searchValue: e.target.value });
  handleSearchClick = () => this.setState({ searchActive: true }, () => this.input.focus());
  handleSearchSubmitByEnter = (e) => {
    if (e.key === 'Enter') {};
    // TODO: submit search
  }

  handleSearchBlur = () => {
    this.setState({ searchActive: false });
  }

  handleOptionsClick = () => this.setState({ filterSelectActive: true });

  handleFilterDropDownBlur = () => this.setState({ filterSelectActive: false });
  
  handleFilterMenuClose = () => this.setState({ filterSelectActive: false });

  handleDropDownItemClick = (e, selectedOption) => {
    this.setState(() => ({
      activeIndex: findIndex(generatedNavItems, navItem => navItem.link === selectedOption.value),
    }));
    browserHistory.push(selectedOption.value);
  }

  handleFilterDropDownItemClick = (e, selectedOption) => {
    this.setState({
      optionLabel: selectedOption.label,
      filtersActiveIndex: findIndex(filterDropdownOptions, option => option.value === selectedOption.value),
      filterSelectActive: false,
    });
  }

  handle3DotsClick = () => {
    this.setState({
      mobileFilterActive: true,
    });
  }

  render() {
    const {
      activeIndex,
      filtersActiveIndex,
      searchActive,
      searchValue,
      filterSelectActive,
      optionLabel,
      mobileFilterActive,
    } = this.state;

    const dropdownOptions = generatedNavItems.map(item => ({ label: item.title, value: item.link }));

    return (
      <div className="photohub-root">
        <div className="photohub-title">{<FormattedMessage {...messages.MyPhotoHub} />}</div>
        <DisplayAtBreakpoint
          screenMedium
          screenLarge
          screenXLarge
        >
          <div className="photohub-nav-bar">
            <div className="photohub-links">
              {generatedNavItems.map(item => (
                <div key={item.link} className="photohub-nav-block">
                  <Link
                    to={item.link}
                    activeClassName="photohub-nav-active"
                    className="photohub-nav-link"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
            <div className="photohub-tools">
              {!filterSelectActive
                ? <Button withIntl onClickEvent={this.handleOptionsClick} theme={{ marginLeft: '10px' }} text={optionLabel} />
                : <DropDown
                  handleMenuClose={this.handleFilterMenuClose}
                  handleBlur={this.handleFilterDropDownBlur}
                  handleSelect={this.handleFilterDropDownItemClick}
                  selectedIndex={filtersActiveIndex}
                  options={filterDropdownOptions}
                  autoFocus
                  defaultMenuIsOpen
                />}
              {!searchActive
                ? <Button onClickEvent={this.handleSearchClick} theme={{ marginLeft: '10px' }} icon={searchAstronaut} />
                : <input
                  type="text"
                  className="photo-hub-search-input-field"
                  onChange={this.handleSearchChange}
                  onBlur={this.handleSearchBlur}
                  onKeyPress={this.handleSearchSubmitByEnter}
                  value={searchValue}
                  ref={(node) => { this.input = node; }}
                />}
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint
          screenSmall
        >
          <div className="photohub-nav-bar" style={{ justifyContent: 'center' }}>
            <div className="photohub-dropdown">
              {!mobileFilterActive && <DropDown
                handleSelect={this.handleDropDownItemClick}
                selectedIndex={activeIndex}
                options={dropdownOptions}
              />
              }
            </div>
            <div className="photohub-tools">
              {!mobileFilterActive
                ? <Button
                  onClickEvent={this.handle3DotsClick}
                  renderIcon={() => <Dots theme={{ circleColor: astronaut }} />}
                />
                : <DropDown
                  handleSelect={this.handleFilterDropDownItemClick}
                  selectedIndex={filtersActiveIndex}
                  options={filterDropdownOptions}
                />
              }
            </div>
          </div>
        </DisplayAtBreakpoint>
        <style jsx>
          {style}
        </style>
      </div>
    );
  }
}

export default withRouter(PhotoHubNavigation);
