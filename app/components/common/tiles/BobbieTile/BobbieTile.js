import React from 'react';
import PropTypes from 'prop-types';
import { horizontalArrow } from 'styles/variables/iconURLs';
import style from './BobbieTile.style';

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
  title,
  readDuration,
  authorName,
  HTMLBlob,
}) => (
  <div className="root">
    <div className="tile-content-container">
      <h3 className="title">{title}</h3>
      <div className="post-meta-data">
        <ul>
          <li className="read-duration">{readDuration}</li>
          <li className="author-name">By {authorName} <img alt="" src={horizontalArrow} /></li>
        </ul>
      </div>
      <div
        className="html-blob-content-container"
        dangerouslySetInnerHTML={{ __html: HTMLBlob }}
      />
    </div>
    <style jsx>{style}</style>
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
