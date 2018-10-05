import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { guideCorner } from 'styles/variables/iconURLs';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './guide-excerpt-tile.style';

const GuideTile = ({
  guideId,
  guideReferenceTitle,
  guideAuthor,
  linkLabel,
  linkUrl,
  shortDescription,
  readingListPrompt,
  readingListType,
  toggleReadingListFlag,
  promptIconUrl,
}) => (
  <div className="guide-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: guideReferenceTitle }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: guideAuthor }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(linkUrl)} />
      {toggleReadingListFlag ? <ToggleReadingList
        itemId={guideId}
        readingListType={readingListType}
        readingListPrompt={null}
        promptIconUrl={promptIconUrl}
      /> : null}
    </div>
    <style jsx>{style}</style>
  </div>
);

GuideTile.propTypes = {
  guideReferenceTitle: PropTypes.string.isRequired,
  guideAuthor: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
};

export default GuideTile;
