import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import noop from 'lodash/noop';

import CardFront from './card-front';
import CardBack from './card-back';

import './telescope-cards.scss';

const mapStateToProps = ({ activeTelescopeMissions }) => ({
  activeTelescopeMissions,
});

@connect(mapStateToProps)
class TelescopeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
    };
  }

  handleFlip(event) {
    event.preventDefault();
    const newFlipState = !this.state.flipped;
    this.setState({
      flipped: newFlipState,
    });
  }

  render() {
    const { teleId, activeTelescopeMissions, telescopeCardData, telescopeCardBack } = this.props;
    const activeMission = activeTelescopeMissions.telescopes.find(
      telescopeMissionData => telescopeMissionData.telescopeId === teleId,
    );

    // this toggles classname as either "card-content" or "card-content flipped"
    // responds to change in state from handleFlip(event)
    const cardClasses = classnames('card-container', {
      flipped: this.state.flipped,
    });

    if (!this.props.teleHasTelescopePage) {
      return null;
    }

    return (
      <li className={cardClasses}>
        <div className="card-content">
          <CardFront
            {...this.props}
            activeMission={activeMission}
            handleFlip={this.handleFlip.bind(this)}
            telescopeOnline={this.props.telescopeStatus.onlineStatus === 'online'}
            alertText={this.props.alertText}
          />

          <CardBack
            teleName={this.props.teleName}
            handleFlip={this.handleFlip.bind(this)}
            telescopeCardData={telescopeCardData}
            teleId={teleId}
            telescopeCardBack={telescopeCardBack}
          />
        </div>
      </li>
    );
  }
}

TelescopeCard.defaultProps = {
  fetchTelescopeCardData: noop,
  telescopeCardData: {},
  telescopeCardBack: {},
};

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
  teleHasTelescopePage: bool,
  teleImageSourceType: string,
  telescopeStatus: object, // TODO: refine this validation
  alertText: string,
  fetchTelescopeCardData: PropTypes.func,
  telescopeCardData: PropTypes.object,
  telescopeCardBack: PropTypes.object,
};

export default TelescopeCard;
