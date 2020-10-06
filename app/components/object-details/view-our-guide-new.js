import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RubyTitle from 'atoms/titles/RubyTitle';
import GuideTile from 'app/components/common/tiles/guide-tile';
import styles from './view-our-guide-new.style';
import GuideTileNew from '../common/tiles/guide-tile-new/guide-tile';
const ViewOurGuideNew = ({ guideHeader, guideTitle, guideUrl, guideSubTitle }) => (
  <div className="root">
    <RubyTitle text={guideHeader} />
    <GuideTileNew
      theme={{ margin: '20px 0' }}
      title={guideTitle}
      linkUrl={guideUrl}
      subTitle={guideSubTitle}
    />
    <style jsx>{styles}</style>
  </div>
);

ViewOurGuideNew.propTypes = {};

export default ViewOurGuideNew;
