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

const HeaderContainer = props => (
  <div className="root">
    <LiveShowVideoViewerNav {...props} />
    {!props.isDesktop ?
      <BigBoxInfoContainer {...props} headerLabel={props.headerLabel} />:
    null}
    <style jsx>{styles}</style>
  </div>
);

HeaderContainer.propTypes = {
  headerLabel: string,
  isDesktop: bool.isRequired,
};

HeaderContainer.defaultProps = {
  headerLabel: '',
};
export default HeaderContainer;
