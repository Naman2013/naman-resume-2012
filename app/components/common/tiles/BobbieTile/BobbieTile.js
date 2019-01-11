import React from 'react';
import PropTypes from 'prop-types';
import ImageClickHandler from '../../ImageClickHandler';
import { horizontalArrow } from 'styles/variables/iconURLs';
import style from './BobbieTile.style';
import CMSStyle from './CMS.style';

/**
  @BobbieTile
  This tile is hard coded to an expected HTML blob provided
  by the `getGuidePanels` response.
  40|60
  60|40
  50|50
  image and video placement support
  https://docs.google.com/document/d/1PK8X1clsV618gHQWtBnwRcFCVsTbpMhSbIYvnz8MW6Y/edit#
*/

const BobbieTile = ({
  showTitle,
  title,
  showSubtitle,
  subtitle,
  readDuration,
  authorName,
  HTMLBlob,
}) => (
  <div className="root">
    <div className="tile-content-container">
      {showTitle === true ? <h3>{title}</h3> : null}
      {showSubtitle === true ? <h3>{subtitle}</h3> : null}
      {/*
      <div className="post-meta-data">
        <ul>
          <li className="read-duration">{readDuration} mins</li>
          <li className="author-name">
            <div>
              <span>By</span> {authorName}
            </div>
            <img alt="" src={horizontalArrow} /></li>
        </ul>
      </div>
      */}
      <ImageClickHandler>
        <div
          className="__html-blob-content-container__"
          dangerouslySetInnerHTML={{ __html: HTMLBlob }}
        />
      </ImageClickHandler>
    </div>
    <style jsx>{style}</style>
    <style jsx>{CMSStyle}</style>
  </div>
);

BobbieTile.propTypes = {
  title: PropTypes.string.isRequired,
  readDuration: PropTypes.string,
  authorName: PropTypes.string,
  HTMLBlob: PropTypes.string.isRequired,
};

BobbieTile.defaultProps = {
  readDuration: '',
  authorName: '',
};

export default BobbieTile;
