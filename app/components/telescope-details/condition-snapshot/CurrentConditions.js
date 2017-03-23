import React from 'react';

export default function CurrentConditions() {
  return (
    <div>
      <div className="col-xs-3">
        <img src={'assets/images/graphics/morecloudy_moon.png'} />
        <p>NOW</p>
        <p>Partly Cloudy</p>
      </div>
      <div className="col-xs-3">
        <img src={'assets/images/graphics/full_moon.png'} />
        <p>Lunar Phase</p>
        <p>Full</p>
      </div>
      <div className="col-xs-3">
        <img src={'assets/images/graphics/sunset.png'} />
        <p>Sunset</p>
        <p>18:44 UTC</p>
      </div>
      <div className="col-xs-3">
        <img src={'assets/images/graphics/sunrise.png'} />
        <p>Sunrise</p>
        <p>18:44 UTC</p>
      </div>
    </div>
  );
}
