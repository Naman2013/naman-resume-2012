import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './telescope-selection.scss';

export default class TelescopeSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      piers: [],
      activePier: null,
      telescopes: [],
      showTelescopes: true
    };
  }

  componentDidMount() {
    const { observatoryList } = this.props;

    /** get only piers with available telescopes **/
    const piers = observatoryList.filter(obs => obs.obsTelescopes && obs.obsTelescopes.length > 0);

    /**
      * @todo default description should be the first telescopes content based on pier availability.
      */
    this.setState({
      piers,
      activePier: piers[0].obsUniqueId,
      telescopes: piers[0].obsTelescopes,
      description: piers[0].obsDescription
    });
  }

  obsMouseOver(obs) {
    console.log(obs);
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
    console.log(this.state.telescopes);
    return (
      <div className="telescopesSelectionContainer col-md-6">

        <div className="categories">
          <ul>
            {this.state.piers.map(obs => {
              return (
                <li key={obs.obsUniqueId}
                  onMouseOver={() => this.obsMouseOver(obs)}
                  onMouseOut={this.obsMouseOut.bind(this)}
                  onClick={() => this.pierClickHandler(obs, event)}>
                  <Link className="cat-link">
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
                <Link activeClassName="active" to="/">
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
    )
  }
}
