import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';
import './promo-message-band.scss';

const PromoMessageBand = ({ title, subtitle }) => (
  <div className="promo-message-band">
    <h4 className="title"><Markdown source={title}/></h4>
    {
      subtitle ?
        <h5 className="subtitle"><Markdown source={subtitle}/></h5> : null
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
