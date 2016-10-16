import React, { Component, PropTypes } from 'react';
import style from './promo-message-band.scss';

class PromoMessageBand extends Component {
  render() {
    return(
      <div className="promo-message-band">
        <h4 className="title">{this.props.message}</h4>
        <h5 className="sub-title">{this.props.subtitle}</h5>
      </div>
    );
  }
}

PromoMessageBand.propTypes = {
  message: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PromoMessageBand;
