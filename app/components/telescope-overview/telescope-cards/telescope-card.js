import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CardFront from './card-front';
import CardBack from './card-back';

import style from './telescope-cards.scss';

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

TelescopeCard.propTypes = {
  teleName: PropTypes.string,
  teleTelescopeUsage: PropTypes.string,
  teleLogoURL: PropTypes.string,
  teleOnlineStatus: PropTypes.string,
  teleOfflineImgURL: PropTypes.string,
  teleSponsorLinkURL: PropTypes.string,
  teleSponsorLogoURL: PropTypes.string,
  teleAccessMethod: PropTypes.string,
  teleHasTelescopePage: PropTypes.string,
  teleImageSourceType: PropTypes.string,
  telescopeStatus: PropTypes.object, // TODO: refine this validation
  alertText: PropTypes.string,
};

export default TelescopeCard;
