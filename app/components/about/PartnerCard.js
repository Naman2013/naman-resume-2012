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
          <img src={image.imageUrl} alt="Partner logo" />
        </a>
        : <img src={image.imageUrl} alt="Partner logo" />
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
