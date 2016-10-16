import React, { Component, PropTypes } from 'react';
import './live-stream.scss';

import Progress from 'react-progressbar';

class LiveStream extends React.Component {

  render() {
    const { handleToggle, toggleNeoview } = this.props;

    return(
      <div className="live-stream">
        <div className="top">
          <Progress completed={75} color="#589A9A" height="35px" />
          <p className="short">
            LIVE // 3:18 left of 10:00     Capturing photons onto the sensor… Preparing next mission coordinates…
          </p>
          <div className="toggle-description" onClick={handleToggle}>
            {(() => {
              if (toggleNeoview) {
                return <i className="fa fa-angle-down"></i>
              } else {
                return <i className="fa fa-angle-up"></i>
              }
            })()}
          </div>
        </div>
        <div className='content'>
          <img src={'/assets/images/icons/icon-galaxy.png'} />
          <div className="description">
            <h3>Andromeda Galaxy (M31)</h3>
            <p>Also known as Messier 31, M31, or NGC 224, the one trillion stars of the Andromedia Galaxy constitute a spiral approximately 780 kiloparsecs from Earth. It is the nearest major galaxy to the Milky Way.</p>
            <p className="small">RA (degrees): 12.6057     Decl (degrees): 25.9915     Constellation: Coma Berenices     Magnitude: 9.61     Size (arc seconds): 960 Distance: 31 million light years      Rise Time: 7:18 UTC     Transit Time:  13:19     Set Time: 19:20 UTC     Moon Proximity: ????     </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveStream;
