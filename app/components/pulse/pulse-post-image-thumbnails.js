import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

const PulsePostThumbnail = ({ images }) => {
  return (
    <div
      className="thumbnails-container"
    >
      {images.map(image => <figure key={image}>
        <a href={image} target="_blank">
          <img
            key={uniqueId()}
            src={image}
            className="thumbnail"
          />
        </a>
      </figure>)}
      <style jsx>{`
          .thumbnails-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 200px;
            float: right;
            margin: 50px 10px 10px 10px;
          }

          .thumbnail {
            height: 150px;
            width: auto;
          }
        `}</style>
    </div>
  );
};


export default PulsePostThumbnail;

PulsePostThumbnail.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
