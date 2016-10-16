import React from 'react';
import styles from './neoview.scss';

function Neoview (props) {

  return (
    <div className={ `neoview-wrapper ${props.className}` }>
      What is this? Slooh telescopes move through a complex process of taking long exposures through
      various filters, ultimate combining that mathematical data into one image. Ever see The Matrix? Think of this as the “Neo View” as the exposure is being processed.

      01:02:03  Initiating photon collection onto the sensor…<br/>
      01:02:08  Red filter exposure in progress…<br/>
      02:05:12  Writing Red filter exposure to server…<br/>
      02:12:22  Green filter exposure in progress…<br/>
      02:12:22  Hammering together various exposures to make the image<br/>
      02:12:22  Layering together various exposures to make the image<br/>
      01:02:03  Initiating photon collection onto the sensor…<br/>
      01:02:08  Red filter exposure in progress…<br/>
      02:05:12  Writing Red filter exposure to server…<br/>
      02:12:22  Green filter exposure in progress…<br/>
      02:12:22  Hammering together various exposures to make the image<br/>
      02:12:22  Layering together various exposures to make the image<br/>
      02:12:22  Initiating next command…<br/>
    </div>
  )

}


export default Neoview;
