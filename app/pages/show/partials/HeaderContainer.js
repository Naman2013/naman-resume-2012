import React from 'react';
import PropTypes from 'prop-types';
import MonotonousTile from 'components/common/tiles/MonotonousTile'
import LiveShowVideoViewer from 'components/LiveShowVideoViewer';
import styles from './HeaderContainer.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const HeaderContainer = (props) => {
  return (
    <div>
      <LiveShowVideoViewer {...props} />
      <MonotonousTile label="Airing Now" text={props.title} />
      <style jsx>{styles}</style>
    </div>
  );
};

HeaderContainer.propTypes = {
  isScreenLarge: bool,
  isScreenMedium: bool,
};

HeaderContainer.defaultProps = {
  isScreenLarge: true,
  isScreenMedium: false,
};
export default HeaderContainer;
