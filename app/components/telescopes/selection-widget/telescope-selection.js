import React, { Component } from 'react';
import { Link } from 'react-router';
import UniversalTime from '../../common/universal-time';
import style from './telescope-selection.scss';

export default class TelescopeSelection extends React.Component {
  constructor(props) {
    super(props);

    /**
      * Grab observatoryId and telescopeId from the URL
      * So we can set default state and render current selection
      */
    const { obsUniqueId, teleUniqueId } = this.props.params;

    this.state = {
      description: '',
      piers: [],
      activePier: obsUniqueId,
      telescopes: [],
      showTelescopes: true,
      activeTelescopeId: teleUniqueId
    };

  }

  componentDidMount() {
    const { observatoryList, params } = this.props;

    /** get only piers with available telescopes **/
    const piers = observatoryList.filter(obs => obs.obsTelescopes && obs.obsTelescopes.length > 0);
    let currentObservatoryTelescopes;

    piers.find(pier => {
      currentObservatoryTelescopes = pier.obsUniqueId === params.obsUniqueId ? pier.obsTelescopes : null;
    });
    /**
      * @todo default description should be the first telescopes content based on pier availability.
      */
    this.setState({
      piers,
      activePier: this.state.activePier || piers[0].obsUniqueId,
      telescopes: currentObservatoryTelescopes || piers[0].obsTelescopes,
      description: piers[0].obsDescription
    });
  }

  obsMouseOver(obs) {
    this.setState({
      description: obs.obsDescription
    });
  }

  obsMouseOut() {

  }

  pierClickHandler(obs, event) {
    event.preventDefault();
    const { activePier, showTelescopes, piers } = this.state;
    if(activePier == obs.obsUniqueId) {
      this.setState({showTelescopes: !showTelescopes})
    } else {
      let newPier = piers.find(pier => pier.obsUniqueId === obs.obsUniqueId);
      this.setState({
        telescopes: newPier.obsTelescopes,
        activePier: obs.obsUniqueId,
        showTelescopes: true
      });
    }
  }

  render() {

    return (
      <div className="obs-telescope-selection-widget">
        <div className="universal-time">
          <UniversalTime />
        </div>
      <div className="telescopesSelectionContainer col-md-7">
        <div className="categories">
          <ul>
            {this.state.piers.map(obs => {
              return (
                <li key={obs.obsUniqueId}
                  onMouseOver={() => this.obsMouseOver(obs)}
                  onMouseOut={this.obsMouseOut.bind(this)}
                  onClick={() => this.pierClickHandler(obs, event)}
                  data-obsUniqueId={obs.obsUniqueId}>
                  <Link className={`cat-link ${this.state.activePier === obs.obsUniqueId ? 'active' : 'inactive'}`}>
                    {obs.obsMenuName + ' '}
                    {obs.obsUniqueId === this.state.activePier ?
                      <span className={this.state.showTelescopes ? 'fa fa-caret-down' : 'fa fa-caret-up'}></span> :
                      null}

                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={ (this.state.showTelescopes ? 'visible' : 'hidden') + ' list'}>
          <ul>
          {this.state.telescopes.map(tel => {

            return (
              <li key={tel.teleUniqueId} className="icon-container">
                <Link className={`${tel.teleUniqueId === this.state.activeTelescopeId ? 'active' : 'inactive'} `} to={tel.telePageURL}>
                  <img className="icon img-circle" src={tel.teleLogoURL} />
                </Link>
              </li>
            )
          })}
          </ul>
        </div>

        <div className="description">
          {this.state.description}
        </div>
      </div>
      </div>
    )
  }
}
