import React from 'react';
import PropTypes from 'prop-types';
import './promo-message-band.scss';

const PromoMessageBand = ({ title, subtitle }) => (
  <div className="promo-message-band">
    <h4 className="title">{title}</h4>
    {
      subtitle ?
        <h5 className="subtitle">{this.props.subtitle}</h5> : null
    }
  </div>
);

PromoMessageBand.defaultProps = {
  title: '',
  subtitle: '',
};

PromoMessageBand.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PromoMessageBand;
