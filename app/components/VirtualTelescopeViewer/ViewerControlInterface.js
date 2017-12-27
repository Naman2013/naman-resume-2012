import React from 'react';
import PropTypes from 'prop-types';

import ViewControls from './ViewControls';
import CoordinateInformation from './CoordinateInformation';
import ZoomControls from './ZoomControls';
import MissionProgressBar from './MissionProgressBar';
import ObjectMetaInformation from './ObjectMetaInformation';
import MissionTitle from './MissionTitle';
import ImageProcessingInformation from './ImageProcessingInformation';

const propTypes = {
  clipped: PropTypes.bool.isRequired,
  handleClip: PropTypes.func.isRequired,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  activeZoomLevel: PropTypes.number.isRequired,
  zoomRange: PropTypes.number.isRequired,
  showInfoButton: PropTypes.bool,

  coordinateArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  missionData: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMissionData: PropTypes.bool.isRequired,
  objectTitleShort: PropTypes.string.isRequired,
  processing: PropTypes.string.isRequired,
  schedulingMember: PropTypes.string.isRequired,

  now: PropTypes.number,
  missionStart: PropTypes.number,
  missionEnd: PropTypes.number,
};

const defaultProps = {
  showInfoButton: false,
  now: 0,
  missionStart: 0,
  missionEnd: 0,
};

const ViewerControlInterface = ({
  clipped,
  handleClip,
  handleZoomIn,
  handleZoomOut,
  activeZoomLevel,
  zoomRange,
  showInfoButton,
  coordinateArray,
  missionData,
  showMissionData,
  objectTitleShort,
  processing,
  schedulingMember,
  now,
  missionStart,
  missionEnd,
}) => (
  <div className="root">
    <div className="top">
      <div className="top-container">
        <ViewControls
          handleClip={handleClip}
          clipped={clipped}
          showInfoButton={showInfoButton}
        />

        <CoordinateInformation coordinateArray={coordinateArray} />
      </div>
    </div>

    <div>
      <div className="zoom-control">
        <ZoomControls
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          zoomRange={zoomRange}
          activeZoomLevel={activeZoomLevel}
        />
      </div>
      <div className="cosmetic-bar-shape">
        <MissionProgressBar
          now={now}
          missionStart={missionStart}
          missionEnd={missionEnd}
        />
      </div>
    </div>

    <div className="bottom">
      <div className="bottom-container">

        <ObjectMetaInformation
          missionData={missionData}
          showMissionData={showMissionData}
        />

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
        justify-content: space-between;
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
