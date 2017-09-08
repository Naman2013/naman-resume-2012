import React from 'react';
import uniqueId from 'lodash/uniqueId';

const TEMP_CONTENT = [
  'Designation: M51, NGC, 5194',
  'Type: Spiral Galaxy',
  'Constellation: Canes Venatici',
  'Magnitude: 8.4',
  'Size: 600 arcseconds',
  'Distance: 37 million light years',
];

const MetaItem = ({ content }) => (
  <li>{ content }</li>
);

const ObjectMetaInformation = () => (
  <div>
    <ul className="list">
      {
        TEMP_CONTENT.map(content => <MetaItem key={uniqueId()} content={content} />)
      }
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
