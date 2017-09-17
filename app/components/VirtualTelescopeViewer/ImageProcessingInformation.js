import React from 'react';
import uniqueId from 'lodash/uniqueId';

const TEMP_CONTENT = [
  'Processing: Bright Galaxy or Comet',
  'Scheduling Member: PaulC.040315',
];

const Item = ({ content }) => (
  <li className="item">{ content }</li>
);

const ImageProcessingInformation = () => (
  <div>
    <ul className="list">
      {
        TEMP_CONTENT.map(content => <Item key={ uniqueId() } content={ content } />)
      }
    </ul>

    <style jsx>{`
      .list {
        list-style-type: none;
        text-align: right;
        margin: 0;
        padding: 0;
      }
    `}</style>
  </div>
);

export default ImageProcessingInformation;
