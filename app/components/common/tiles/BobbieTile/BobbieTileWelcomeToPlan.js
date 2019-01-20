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
    <div style={{marginTop: '0px', marginBottom: '0px', padding: '0px'}} className="tile-content-container">
      <h1 style={{ marginBottom: '20px' }}>{title}</h1>
      <table className="middle-content" style={{width: '100%'}}>
        <tr>
          <td style={{width: '60%'}}>
            <div className="text-content">
              <h2>Ready for Orientation?</h2>
              <div className="plan-name">{planName}</div>
              <div
                className="__html-blob-content-container__"
                dangerouslySetInnerHTML={{ __html: HTMLBlob }}
              />
            </div>
          </td>

          <td style={{width: '40%'}}>
            <div className="guide-tile">
              <div className="guide-tile-frame">
                <img alt="" src="https://vega.slooh.com/assets/v4/common/guide_corner.svg" className="top-left" />
                <img alt="" src="https://vega.slooh.com/assets/v4/common/guide_corner.svg" className="top-right" />
              </div>
              <div className="guide-tile-frame bottom">
                <img alt="" src="https://vega.slooh.com/assets/v4/common/guide_corner.svg" className="top-left" />
                <img alt="" src="https://vega.slooh.com/assets/v4/common/guide_corner.svg" className="top-right" />
              </div>
              <h4 className="title">A Guide to</h4>
              <h5 className="subTitle">Your Membership</h5>
            </div>
          </td>
        </tr>
      </table>
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
