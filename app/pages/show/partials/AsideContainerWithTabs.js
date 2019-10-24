/***********************************
 * V4 Aside content for shows
 * this will hold the three tab nav on desktop
 * and will never be shown on tablet/mobile
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { withTranslation } from 'react-i18next';
import ThreeTabbedNav from 'app/components/ThreeTabbedNav';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import BigBoxInfoContainer from './BigBoxInfoContainer';
import AboutTab from './AboutTab';
import CommentsTab from './CommentsTab';
import DetailsTab from './DetailsTab';
import styles from './AsideContainerWithTabs.style';

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
@withTranslation()
class AsideContainerWithTabs extends Component {
  static propTypes = {
    aboutIsActive: bool.isRequired,
    commentsIsActive: bool.isRequired,
    detailsIsActive: bool.isRequired,
    hasDiscussionThread: bool,
    showAbout: func,
    showComments: func,
    showDetails: func,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,

  };

  static defaultProps = {
    hasDiscussionThread: false,
    showAbout: noop,
    showComments: noop,
    showDetails: noop,
  };

  state = {};

  render() {
    const {
      aboutIsActive,
      commentsIsActive,
      detailsIsActive,
      hasDiscussionThread,
      isScreenMedium,
      isScreenLarge,
      showAbout,
      showComments,
      showDetails,
      headerTitle,
      t,
    } = this.props;

    return (
      <div className="root">
        <div
          className="header-title"
          dangerouslySetInnerHTML={{ __html: headerTitle }}
        />
        <div className="full-width">
          {hasDiscussionThread ? (
            <ThreeTabbedNav
              firstTitle={t('Shows.About')}
              secondTitle={t('Shows.Comments')}
              thirdTitle={t('Shows.Details')}
              firstTabIsActive={aboutIsActive}
              firstTabOnClick={showAbout}
              secondTabIsActive={commentsIsActive}
              secondTabOnClick={showComments}
              thirdTabIsActive={detailsIsActive}
              thirdTabOnClick={showDetails}
            />
          ) : (
            <TwoTabbedNav
              firstTitle={t('Shows.About')}
              secondTitle={t('Shows.Details')}
              firstTabIsActive={aboutIsActive}
              firstTabOnClick={showAbout}
              secondTabIsActive={detailsIsActive}
              secondTabOnClick={showDetails}
            />
          )}
        </div>
        {aboutIsActive ? <AboutTab {...this.props} /> : null}
        {commentsIsActive ? <CommentsTab {...this.props} /> : null}
        {detailsIsActive ? <DetailsTab {...this.props} /> : null}

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AsideContainerWithTabs;
