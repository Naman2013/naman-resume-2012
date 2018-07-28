import React from 'react';
import PropTypes from 'prop-types';
import LiveShowVideoViewerNav from 'components/LiveShowVideoViewer/LiveShowVideoViewerNav';
import BigBoxInfoContainer from './BigBoxInfoContainer';
import styles from './HeaderContainer.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const HeaderContainer = (props) => (
  <div>
    <LiveShowVideoViewerNav {...props} />
    {!props.isScreenLarge ?
      <BigBoxInfoContainer {...props} />:
    null}
    <style jsx>{styles}</style>
  </div>
);

HeaderContainer.propTypes = {
  isScreenLarge: bool,
  isScreenMedium: bool,
};

HeaderContainer.defaultProps = {
  isScreenLarge: true,
  isScreenMedium: false,
};
export default HeaderContainer;
