import React from 'react';
import PropTypes from 'prop-types';
import style from './MonotonousTile.style';
import ToggleReadingList from '../../ToggleReadingList/ToggleReadingList';

const MonotonousTile = ({
  text,
  label,
  id,
  showReadingList,
  readingListType,
  readingListPrompt,
  promptIconUrl,
}) => (
  <div className="root">
    <div className="title-label" dangerouslySetInnerHTML={{ __html: label }} />
    <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
    {showReadingList && (
      <ToggleReadingList
        itemId={id}
        readingListType={readingListType}
        readingListPrompt={readingListPrompt}
        promptIconUrl={promptIconUrl}
      />
    )}
    <style jsx>{style}</style>
  </div>
);

MonotonousTile.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  showReadingList: PropTypes.bool,
  readingListType: PropTypes.string,
};

MonotonousTile.defaultProps = {
  id: '',
  showReadingList: false,
  readingListType: '',
};

export default MonotonousTile;
