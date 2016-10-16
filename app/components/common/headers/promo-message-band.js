import React, { Component, PropTypes } from 'react';
import style from './promo-message-band.scss';

class PromoMessageBand extends Component {
  render() {
    const { title, subtitle } = this.props;
    return(
      <div className="promo-message-band">
        <h4 className="title">{title}</h4>
        {
          subtitle ?
            <h5 className="sub-title">{this.props.subtitle}</h5> : null
        }
      </div>
    );
  }
}

PromoMessageBand.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PromoMessageBand;
