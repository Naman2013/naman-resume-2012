import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import TileButton from './TileButton';

import style from './BurnhamsCornerLarge.style';
import messages from './BurnhamsCorner.messages';

const BurnhamsCornerLarge = ({
  objectTitle,
  content,
  imageURL,
  hasLink,
  linkLabel,
  linkURL,
  showMore,
  toggleReadMore,
  needToShowMore,
}) => (
  <Fragment>
    <div className="bc">
      <div className="bc-left">
        <div className="bc-title">{objectTitle}</div>
        <div className="bc-author">Burnham&#39;s Corner</div>
        <div className="bc-desc">
          <div className="bc-img">
            <img src={imageURL} alt="Burnhams Corner" />
          </div>
          <div className="bc-desc" dangerouslySetInnerHTML={{ __html: content }} />
          {needToShowMore && (
            <p>
              <button onClick={toggleReadMore} className="action-read-more">
                {showMore
                  ? <FormattedMessage {...messages.ReadLess} /> 
                  : <FormattedMessage {...messages.ReadMore} /> 
                }
              </button>
            </p>
          )}
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
  showMore: PropTypes.bool.isRequired,
  needToShowMore: PropTypes.bool.isRequired,
  toggleReadMore: PropTypes.func.isRequired,
};

export default BurnhamsCornerLarge;
