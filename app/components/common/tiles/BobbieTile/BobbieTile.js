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

const BobbieTile = ({ HTMLBlob }) => (
  <Fragment>
    <div dangerouslySetInnerHTML={{ __html: HTMLBlob }} />
    <style jsx>{style}</style>
  </Fragment>
);

BobbieTile.propTypes = {
  HTMLBlob: PropTypes.string.isRequired,
};

export default BobbieTile;
