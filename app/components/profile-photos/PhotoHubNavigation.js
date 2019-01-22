import React, { Component } from 'react';
import { Link, browserHistory, withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import findIndex from 'lodash/findIndex';
import DropDown from 'components/common/DropDown';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import messages from './PhotoHubNavigation.messages';
import style from './PhotoHubNavigation.style';
import Button from 'components/common/style/buttons/Button';
import { searchAstronaut } from 'styles/variables/iconURLs.js'

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

class PhotoHubNavigation extends Component {
  state = {
    searchValue: '',
    searchActive: false,
    activeIndex: findIndex(generatedNavItems, navItem => navItem.link === this.props.location.pathname),
  }

  handleSearchChange = e => this.setState({ searchValue: e.target.value });
  handleSearchClick = () => this.setState({ searchActive: true }, () => this.input.focus());
  handleSearchSubmitByEnter = (e) => {
    if (e.key === 'Enter') console.log('filter images');
    // this.setState({ searchActive: false });
    //  new request
  }

  handleSearchBlur = () => {
    this.setState({ searchActive: false });
    //  new request
  }

  handleDropDownItemClick = (e, selectedOption) => {
    if (e) e.preventDefault();

    this.setState(() => ({
      activeIndex: findIndex(generatedNavItems, navItem => navItem.link === selectedOption.value),
    }));
    browserHistory.push(selectedOption.value);
  }

  render() {
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
              <Button theme={{ marginLeft: '10px' }} text="Options" />
              <Button onClickEvent={this.handleSearchClick} theme={{ marginLeft: '10px', display: this.state.searchActive ? 'none' : 'flex' }} icon={searchAstronaut} />
              <input
                style={{ display: this.state.searchActive ? 'block' : 'none' }}
                type="text"
                className="photo-hub-search-input-field"
                onChange={this.handleSearchChange}
                onBlur={this.handleSearchBlur}
                onKeyPress={this.handleSearchSubmitByEnter}
                value={this.state.searchValue}
                ref={(node) => { this.input = node; }}
              />
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint
          screenSmall
        >
          <div className="photohub-nav-bar">
            <div className="photohub-dropdown">
              <DropDown
                handleSelect={this.handleDropDownItemClick}
                selectedIndex={this.state.activeIndex}
                options={dropdownOptions}
              />
            </div>
            <div className="photohub-tools">
              <Button icon={searchAstronaut} />
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