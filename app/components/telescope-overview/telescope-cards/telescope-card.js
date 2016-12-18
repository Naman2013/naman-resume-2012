import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import CardFront from './card-front';
import CardBack from './card-back';

import style from './telescope-cards.scss';

const mapStateToProps = ({ activeTelescopeMissions }) => ({
 activeTelescopeMissions,
});

@connect(mapStateToProps)
class TelescopeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false
    };
  }

  handleFlip(event) {
    event.preventDefault();
    const newFlipState = !this.state.flipped;
    this.setState({
      flipped: newFlipState
    });
  }

  render() {
    const { teleId, activeTelescopeMissions } = this.props;
    const activeMission = activeTelescopeMissions.telescopes.find(telescopeMissionData => telescopeMissionData.telescopeId === teleId);
    const cardClasses = classnames({
      'card-container': true,
      'flipped': this.state.flipped,
      'col-md-4': true,
      'col-sm-4': true,
      'col-xs-4': true
    });

    if( this.props.teleHasTelescopePage !== 'true' ) {
      return null;
    }

    return(
      <li className={cardClasses}>
        <div className="card-content">

          <CardFront
            {...this.props}
            activeMission={activeMission}
            handleFlip={this.handleFlip.bind(this)}
            telescopeOnline={this.props.telescopeStatus.onlineStatus === 'online'}
            alertText={this.props.alertText} />

          <CardBack
            teleName={this.props.teleName}
            handleFlip={this.handleFlip.bind(this)} />

        </div>
      </li>
    );
  }
}

const { string, number, bool, object } = PropTypes;
TelescopeCard.propTypes = {
  teleId: string.isRequired,
  teleName: string,
  teleTelescopeUsage: string,
  teleLogoURL: string,
  teleOnlineStatus: string,
  teleOfflineImgURL: string,
  teleSponsorLinkURL: string,
  teleSponsorLogoURL: string,
  teleAccessMethod: string,
  teleHasTelescopePage: string,
  teleImageSourceType: string,
  telescopeStatus: object, // TODO: refine this validation
  alertText: string,
};

export default TelescopeCard;
