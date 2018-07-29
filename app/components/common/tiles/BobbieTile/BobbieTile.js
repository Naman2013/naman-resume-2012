import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
  <Fragment>
    <h3>{title}</h3>
    <div className="post-meta-data">
      <ul>
        <li>{readDuration}</li>
        <li>{authorName}</li>
      </ul>
    </div>
    <div dangerouslySetInnerHTML={{ __html: HTMLBlob }} />
    <style jsx>{style}</style>
  </Fragment>
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
