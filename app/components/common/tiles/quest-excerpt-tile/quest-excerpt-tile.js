import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import ToggleReadingList from 'app/components/common/ToggleReadingList';
import Button from 'app/components/common/style/buttons/Button';
import style from './quest-excerpt-tile.style';

const QuestExcerptTile = ({
  questAuthor,
  questId,
  title,
  linkLabel,
  linkUrl,
  shortDescription,
}) => (
  <div className="quest-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: questAuthor }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(linkUrl)} />
    </div>
    <style jsx>{style}</style>
  </div>
);

QuestExcerptTile.propTypes = {
  questAuthor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};

export default QuestExcerptTile;
