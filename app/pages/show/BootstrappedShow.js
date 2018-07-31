/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';
import TwoTabbedNav from 'components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import ObjectDetailList from 'components/common/ObjectDetailList';
import HeaderContainer from './partials/HeaderContainer'
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer';
import CenterColumn from 'components/common/CenterColumn';
import styles from './BootstrappedShow.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const BootstrappedShow = (props) => {
  const {
    isScreenMedium,
    isScreenLarge,
  } = props;
console.log(props)
  return (<div className="root">
    <CenterColumn>
      <HeaderContainer {...props} />
      <div className="main-container">
        <ResponsiveTwoColumnContainer
          renderNavigationComponent={navProps =>
            (<TwoTabbedNav
              firstTitle="Observations"
              secondTitle="Details"
              firstTabIsActive={navProps.showMainContainer}
              firstTabOnClick={navProps.onShowMainContainer}
              secondTabIsActive={navProps.showAsideContainer}
              secondTabOnClick={navProps.onShowAsideContainer}
            />)
          }
          renderAsideContent={() => (<div {...props} />)}
          isScreenLarge={isScreenLarge}
          renderMainContent={() => <div {...props} />}
        />
      </div>
    </CenterColumn>
    <style jsx>{styles}</style>
  </div>);
};

BootstrappedShow.propTypes = {
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};

BootstrappedShow.defaultProps = {

};

export default BootstrappedShow;
