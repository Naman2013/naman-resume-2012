import React, { Component, PropTypes } from 'react';
import style from './promo-message-band.scss';

class PromoMessageBand extends Component {
  render() {
    return(
      <div className="col-md-12 promo-message-band">
        <h4 className="title">{this.props.message}</h4>
      </div>
    );
  }
}

PromoMessageBand.propTypes = {
  message: PropTypes.string
};

export default PromoMessageBand;
