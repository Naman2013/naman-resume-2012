import React, { Component, PropTypes } from 'react';
import { Link, activeClassName } from 'react-router';
import UniversalTime from '../../common/universal-time';
import style from './telescope-selection.scss';

/**
  THEMES:
  Since this navigational element needs to be able
  to sit on light and dark backgrounds, use either the
  light : for light colored backgrounds
  dark : for dark colored backgrounds
*/

class TelescopeSelection extends React.Component {
  constructor(props) {
    super(props);

    const { obsUniqueId, teleUniqueId } = this.props.params;

    this.state = {
      showTelescopes: true, // used to toggle the display of telescopes
      activeObservatoryId: obsUniqueId,
      activeTelescopeId: teleUniqueId,
    };

  }

  handleMouseEnter(event) {
    /**
      TODO: set the current active observatoryID
    */
    this.setState({
      activeObservatoryId: ``,
    });
  }

  fetchDefaultTelescopeId(observatory) {
    const { obsTelescopes } = observatory;
    if(obsTelescopes.length > 0) {
      return observatory.obsTelescopes[0].teleUniqueId;
    } else {
      return null;
    }
  }

  render() {
    const {
      observatoryList,
      params,
      rootRoute,
      appendToRoute,
      showUTCTimer,
      theme } = this.props;
    const { obsUniqueId, teleUniqueId } = params;

    if(observatoryList.length === 0) {
      return null;
    }

    const activeObservatory = observatoryList.find(observatory => ( obsUniqueId === observatory.obsUniqueId ));
    const activeTelescope = activeObservatory.obsTelescopes.find(telescope => ( teleUniqueId === telescope.teleUniqueId ));

    return (
      <div
        className={`obs-telescope-selection-widget ${theme} clearfix`}>

        {
          showUTCTimer ?
          <div className="universal-time">
            <UniversalTime />
          </div> : null
        }

        <div className="telescope-selection-container">

          <div className="categories">
            <ul className="category-list">
              {
                observatoryList.map(observatory => {
                  return(
                    <li className="observatory" key={observatory.obsUniqueId}>
                      <Link
                        activeClassName="active"
                        to={`${rootRoute}/${observatory.obsUniqueId}/${this.fetchDefaultTelescopeId(observatory)}${appendToRoute}`}
                        className={`${observatory.obsUniqueId === obsUniqueId ? 'active' : ''} cat-link`}>
                        { observatory.obsMenuName }
                      </Link>
                    </li>
                  );
                })
              }
            </ul>

            <ul
              className={`piers ${(activeObservatory.obsUniqueId === obsUniqueId) ? 'visible' : 'hidden'}`}>
              {
                activeObservatory.obsTelescopes.map(telescope => (
                  <li
                    key={telescope.teleUniqueId}
                    className="icon-container">
                    <Link
                      className="telescope-button"
                      activeClassName="active"
                      to={`${rootRoute}/${obsUniqueId}/${telescope.teleUniqueId}${appendToRoute}`}>
                      <img
                        className="icon img-circle"
                        src={ telescope.teleLogoURL } />
                    </Link>
                  </li>
                ))
              }
            </ul>

          </div>

        </div>

        <div className="description">
          { activeTelescope.teleTelescopeUsage }
        </div>

      </div>
    )
  }
}

TelescopeSelection.defaultProps = {
  params: {
    obsUniqueId: '',
    teleUniqueId: '',
  },
  rootRoute: 'telescope-details',
  showUTCTimer: true,
  theme: 'dark',
};

TelescopeSelection.propTypes = {
  params: PropTypes.shape({
    obsUniqueId: PropTypes.string.isRequired,
    teleUniqueId: PropTypes.string.isRequired,
  }),
  rootRoute: PropTypes.string.isRequired, // used for internal link building
  appendToRoute: PropTypes.string,
  observatoryList: PropTypes.array,
  showUTCTimer: PropTypes.bool,
  theme: PropTypes.string,
};

export default TelescopeSelection;
