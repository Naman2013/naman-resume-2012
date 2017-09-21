import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import ViewControls from './ViewControls';
import Timestamp from './Timestamp';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import Bar from './Bar';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

const propTypes = {
  clipped: PropTypes.bool.isRequired,
  handleClip: PropTypes.func.isRequired,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  showInfoButton: PropTypes.bool,
  handleInfoClick: PropTypes.func,

  timestamp: PropTypes.number.isRequired,
  coordinateArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  missionData: PropTypes.arrayOf(PropTypes.string).isRequired,
  objectTitleShort: PropTypes.string.isRequired,
  processing: PropTypes.string.isRequired,
  schedulingMember: PropTypes.string.isRequired,
};

const defaultProps = {
  showInfoButton: false,
  handleInfoClick: noop,
};

const ViewerControlInterface = ({
  clipped,
  handleClip,
  handleZoomIn,
  handleZoomOut,
  showInfoButton,
  handleInfoClick,
  timestamp,
  coordinateArray,
  missionData,
  objectTitleShort,
  processing,
  schedulingMember,
}) => (
  <div className="root">
    <div className="top">
      <div className="top-container">
        <ViewControls
          handleClip={handleClip}
          clipped={clipped}
          showInfoButton={showInfoButton}
          handleInfoClick={handleInfoClick}
        />

        <div className="grow-2">
          <Timestamp unixTimestamp={timestamp} />
        </div>

        <CoordinateInformation coordinateArray={coordinateArray} />
      </div>
    </div>

    <div className="center">
      <div className="zoom-control">
        <ZoomControls
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          showInfoButton={showInfoButton}
          handleInfoClick={handleInfoClick}
        />
      </div>
      <div className="cosmetic-bar-shape">
        <Bar />
      </div>
    </div>

    <div className="bottom">
      <div className="bottom-container">
        <ObjectMetaInformation missionData={missionData} />

        <div className="grow-2">
          <MissionTitle title={objectTitleShort} />
        </div>

        <ImageProcessingInformation
          processing={processing}
          schedulingMember={schedulingMember}
        />
      </div>
    </div>

    <style jsx>{`
      .top {
        position: absolute;
        top: 0;
        width: 100%;
      }

      .top-container {
        display: flex;
        justify-content: space-around;
        padding: 20px;
      }

      .grow-2 {
        flex-grow 2;
      }

      .zoom-control, .cosmetic-bar-shape {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .zoom-control {
        left: 20px;
      }

      .cosmetic-bar-shape {
        right: 20px;
      }

      .bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
      }

      .bottom-container {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        padding: 30px;
      }
    `}</style>
  </div>
);

ViewerControlInterface.propTypes = propTypes;
ViewerControlInterface.defaultProps = defaultProps;

export default ViewerControlInterface;
