import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TileButton from './TileButton';

import style from './BurnhamsCornerSmall.style';
import messages from './BurnhamsCorner.messages';

const BurnhamsCornerSmall = ({
  objectTitle,
  content,
  imageURL,
  hasLink,
  linkLabel,
  linkURL,
  showMore,
  toggleReadMore,
  needToShowMore,
}) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="bc">
        <div className="bc-left">
          <div className="bc-title">{objectTitle}</div>
          <div className="bc-author">Burnham&#39;s Corner</div>
          <div
            className="bc-desc"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {needToShowMore && (
            <p>
              <button onClick={toggleReadMore} className="action-read-more">
                {showMore ? t('.ReadLess') : t('.ReadMore')}
              </button>
            </p>
          )}
          <img src={imageURL} alt="" />
          {hasLink && (
            <div className="action-container">
              <TileButton text={linkLabel} linkURL={linkURL} />
            </div>
          )}
        </div>
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};

BurnhamsCornerSmall.propTypes = {
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

export default BurnhamsCornerSmall;
