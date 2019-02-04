/** *********************************
 * V4 PartnerCard component
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import style from './PartnerCard.style';

const PartnerCard = ({ image }) => {
  return (
    <div className="img-wrapper">
      {image.hasLink
        ? <a href={image.linkUrl} target="_blank" rel="noopener noreferrer">
          <img className="partner-logo" src={image.imageUrl} alt="Partner logo" />
        </a>
        : <div>
          <img className="partner-logo" src={image.imageUrl} alt="Partner logo" />
        </div>
      }
      <style jsx>{style}</style>
    </div>
  );
};

PartnerCard.propTypes = {
  image: PropTypes.shape({
    hasLink: PropTypes.bool,
    linkUrl: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default PartnerCard;
