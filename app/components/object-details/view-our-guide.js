import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RubyTitle from 'atoms/titles/RubyTitle';
import GuideTile from 'app/components/common/tiles/guide-tile';
import styles from './view-our-guide.style';
const ViewOurGuide = ({
  guideHeader,
  guideTitle,
  guideUrl,
  guideSubTitle,
}) => (
  <div className="root">
    <RubyTitle text={guideHeader} />
    <GuideTile
      theme={{ margin: '20px 0' }}
      title={guideTitle}
      linkUrl={guideUrl}
      subTitle={guideSubTitle}
    />
    <style jsx>{styles}</style>
  </div>
);

ViewOurGuide.propTypes = {

};

export default ViewOurGuide;
