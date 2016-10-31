import React, { Component } from 'react';
import { Link, activeClassName } from 'react-router';
import UniversalTime from '../../common/universal-time';
import style from './telescope-selection.scss';

export default class TelescopeSelection extends React.Component {
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

    console.log('props for the nav menu...');
    console.log(this.props);
    console.log('=========================');

    const { observatoryList, params } = this.props;
    const { obsUniqueId, teleUniqueId } = params;
    const activeObservatory = observatoryList.find(observatory => ( obsUniqueId === observatory.obsUniqueId ));
    const activeTelescope = activeObservatory.obsTelescopes.find(telescope => ( teleUniqueId === telescope.teleUniqueId ));

    console.log(activeObservatory);
    return (
      <div className="obs-telescope-selection-widget clearfix">

        <div className="universal-time">
          <UniversalTime />
        </div>

        <div className="telescope-selection-container">

          <div className="categories">
            <ul className="category-list">
              {
                observatoryList.map(observatory => {
                  return(
                    <li className="observatory" key={observatory.obsUniqueId}>
                      <Link
                        activeClassName="active"
                        to={`telescope-details/${observatory.obsUniqueId}/${this.fetchDefaultTelescopeId(observatory)}`}
                        className="cat-link">
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
                      activeClassName="active"
                      to={`telescope-details/${obsUniqueId}/${telescope.teleUniqueId}`}>
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
