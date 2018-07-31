import React from 'react';
import PropTypes from 'prop-types';
import MonotonousTile from 'components/common/tiles/MonotonousTile'
import LiveShowVideoViewer from 'components/LiveShowVideoViewer';
import styles from './BigBoxInfoContainer.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const BigBoxInfoContainer = (props) => (
  <div className="root">
    <LiveShowVideoViewer {...props} />
    <MonotonousTile label="Airing Now" text={props.title} />
    <style jsx>{styles}</style>
  </div>
  );

BigBoxInfoContainer.propTypes = {
  isScreenLarge: bool,
  isScreenMedium: bool,
};

BigBoxInfoContainer.defaultProps = {
  isScreenLarge: true,
  isScreenMedium: false,
};
export default BigBoxInfoContainer;
