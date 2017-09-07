import React from 'react';

const CoordinateInformation = ({ content }) => (
  <div className="root">
    <p>
      Celestial Coordinates:<br />
      Right Asension: 13h 29m 52.6s<br />
      Declination: +47&deg; 11&apos; 44&quot;
    </p>

    <style jsx>{`
        .root {
          text-align: right;
        }
    `}</style>
  </div>
);

export default CoordinateInformation;
