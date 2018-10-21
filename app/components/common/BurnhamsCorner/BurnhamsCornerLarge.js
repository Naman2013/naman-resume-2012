import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TileButton from './TileButton';
import style from './BurnhamsCornerLarge.style';

const BurnhamsCornerLarge = ({
  objectTitle,
  content,
  imageURL,
  hasLink,
  linkLabel,
  linkURL,
}) => (
  <Fragment>
    <div className="bc">
      <div className="bc-left">
        <div className="bc-title">{objectTitle}</div>
        <div className="bc-author">Burnham&#39;s Corner</div>
        <div className="bc-desc">
          {content}
        </div>
        {
          hasLink &&
            <div className="bc-action">
              <TileButton
                text={linkLabel}
                linkURL={linkURL}
              />
            </div>
        }
      </div>
      <div className="bc-img-right">
        <img src={imageURL} alt="Burnhams Corner" />
      </div>
    </div>
    <style jsx>{style}</style>
  </Fragment>
);

BurnhamsCornerLarge.propTypes = {
  objectTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  hasLink: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};

export default BurnhamsCornerLarge;
