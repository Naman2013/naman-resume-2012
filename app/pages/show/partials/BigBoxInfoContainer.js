import React from 'react';
import PropTypes from 'prop-types';
import MonotonousTile from 'app/components/common/tiles/MonotonousTile';
import LiveShowVideoViewer from 'app/components/LiveShowVideoViewer';
import styles from './BigBoxInfoContainer.style';

const { arrayOf, bool, number, oneOfType, shape, string } = PropTypes;

const BigBoxInfoContainer = props => (
  <div className="root">
    <LiveShowVideoViewer {...props} />
    <MonotonousTile
      label={props.headerLabel}
      text={props.title}
      showReadingList
      readingListType="show"
      id={props.showId}
      readingListPrompt={props.readingListPrompt}
      promptIconUrl={props.promptIconUrl}
    />
    <style jsx>{styles}</style>
  </div>
);

BigBoxInfoContainer.propTypes = {
  headerLabel: string,
  isScreenLarge: bool,
  isScreenMedium: bool,
};

BigBoxInfoContainer.defaultProps = {
  headerLabel: '',
  isScreenLarge: true,
  isScreenMedium: false,
};
export default BigBoxInfoContainer;
