import React from 'react';
import PropTypes from 'prop-types';
import { horizontalArrow } from 'styles/variables/iconURLs';
import style from './BobbieTileWelcomeToPlan.style';
import CMSStyle from './CMS.style';

/**
  @BobbieTileWelcomeToPlan
  This tile is hard coded to an expected HTML blob provided
  by the `getGuidePanels` response.
  40|60
  60|40
  50|50
  image and video placement support
  https://docs.google.com/document/d/1PK8X1clsV618gHQWtBnwRcFCVsTbpMhSbIYvnz8MW6Y/edit#
*/

const BobbieTileWelcomeToPlan = ({
  title,
  planName,
  HTMLBlob,
}) => (
  <div className="root">
    <div className="tile-content-container">
      <h3 style={{ marginBottom: '20px' }} className="title">{title}</h3>
      <div className="post-meta-data">
        <ul>
          <li className="author-name">
            <div>{planName}</div>
            <img alt="" src={horizontalArrow} /></li>
        </ul>
      </div>
      <div
        className="__html-blob-content-container__"
        dangerouslySetInnerHTML={{ __html: HTMLBlob }}
      />
    </div>
    <style jsx>{style}</style>
    <style jsx>{CMSStyle}</style>
  </div>
);

BobbieTileWelcomeToPlan.propTypes = {
  title: PropTypes.string.isRequired,
  planName: PropTypes.string,
  HTMLBlob: PropTypes.string.isRequired,
};

BobbieTileWelcomeToPlan.defaultProps = {
  planName: '',
};

export default BobbieTileWelcomeToPlan;
