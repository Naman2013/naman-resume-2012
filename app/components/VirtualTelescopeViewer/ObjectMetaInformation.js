import React from 'react';

const ObjectMetaInformation = () => (
  <div>
    <ul className="list">
      <li className="item">Designation: M51, NGC, 5194</li>
      <li className="item">Type: Spiral Galaxy</li>
      <li className="item">Constellation: Canes Venatici</li>
      <li className="item">Magnitude: 8.4</li>
      <li className="item">Size: 600 arcseconds</li>
      <li className="item">Distance: 37 million light years</li>
    </ul>

    <style jsx>{`
      .list {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    `}</style>
  </div>
);

export default ObjectMetaInformation;
