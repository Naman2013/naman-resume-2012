import React from 'react';
import PropTypes from 'prop-types';
import './live-stream.scss';

const propTypes = {
  objectIconURL: PropTypes.string.isRequired,
  objectTitle: PropTypes.string.isRequired,
  objectRA: PropTypes.string.isRequired,
  objectDec: PropTypes.string.isRequired,
  objectConstellation: PropTypes.string.isRequired,
  objectMagnitude: PropTypes.string.isRequired,
  objectSizeArcMinutes: PropTypes.string.isRequired,
  objectDistance: PropTypes.string.isRequired,
  objectRiseTime: PropTypes.string.isRequired,
  objectTransitTime: PropTypes.string.isRequired,
  objectSetTime: PropTypes.string.isRequired,
  objectMoonProximity: PropTypes.string.isRequired,
};

const LiveStream = ({
  objectIconURL,
  objectTitle,
  objectRA,
  objectDec,
  objectConstellation,
  objectMagnitude,
  objectSizeArcMinutes,
  objectDistance,
  objectRiseTime,
  objectTransitTime,
  objectSetTime,
  objectMoonProximity,
}) => (
  <div className="live-stream">
    <div className="content">
      <img alt="" height="50" src={objectIconURL} />
      <div>
        <h3 className="title">{objectTitle}</h3>
        <p className="small">
          RA (decimal): {objectRA}
          Decl (decimal): {objectDec}
          Constellation: {objectConstellation}
          Magnitude: {objectMagnitude}
          Size (arc minutes): {objectSizeArcMinutes} 
          Distance: {objectDistance}
          Rise Time: {objectRiseTime}
          Transit Time: {objectTransitTime}
          Set Time: {objectSetTime}
          Moon Proximity: {objectMoonProximity}
        </p>
      </div>
    </div>
  </div>
);

LiveStream.propTypes = propTypes;
export default LiveStream;
