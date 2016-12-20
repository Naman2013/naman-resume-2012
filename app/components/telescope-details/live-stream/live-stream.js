import React, { Component, PropTypes } from 'react';
import './live-stream.scss';

class LiveStream extends React.Component {
  render() {
    const {
      objectIconURL,
      objectTitle,
      objectDescription,
      objectRA,
      objectDec,
      objectConstellation,
      objectMagnitude,
      objectSizeArcMinutes,
      objectDistance,
      objectRiseTime,
      objectTransitTime,
      objectSetTime,
      objectMoonProximity } = this.props;

    return(
      <div className="live-stream">
        <div className='content'>
          <img height="50" src={objectIconURL} />
          <div>
            <h3 className="title">{objectTitle}</h3>
            <p className="description">{objectDescription}</p>
            <p className="small">RA (degrees): {objectRA} Decl (degrees): {objectDec} Constellation: {objectConstellation} Magnitude: {objectMagnitude} Size (arc minutes): {objectSizeArcMinutes}  Distance: {objectDistance} Rise Time: {objectRiseTime} Transit Time: {objectTransitTime} Set Time: {objectSetTime} Moon Proximity: {objectMoonProximity}</p>
          </div>
        </div>
      </div>
    );
  }
}

const { string, number, bool } = PropTypes;
LiveStream.propTypes = {
  objectIconURL: string.isRequired,
  objectTitle: string.isRequired,
  objectDescription: string.isRequired,

  objectRA: string.isRequired,
  objectDec: string.isRequired,
  objectConstellation: string.isRequired,
  objectMagnitude: string.isRequired,
  objectSizeArcMinutes: number.isRequired,
  objectDistance: string.isRequired,
  objectRiseTime: string.isRequired,
  objectTransitTime:  string.isRequired,
  objectSetTime: string.isRequired,
  objectMoonProximity: string.isRequired,
};

export default LiveStream;
