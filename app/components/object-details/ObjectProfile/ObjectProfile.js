import React from 'react';
import PropTypes from 'prop-types';
import style from './ObjectProfile.style';

const ObjectProfile = ({
  scienceName,
  objectSpecs,
  visibilitySeason,
  midnightCulmination,
}) => (
  <section className="object-details-grid">
    <div className="f4">
      <h2>Scientific Name:</h2>
      <p>{scienceName}</p>
    </div>
    <div className="f4">
      <h2>Celestial Coordinates:</h2>
      <p>RA: {objectSpecs.ra}</p>
      <p>Dec: {objectSpecs.dec}</p>
    </div>
    <div className="f2">
      <h2>Magnitude:</h2>
      <p>{objectSpecs.magnitude}</p>
    </div>
    <div className="f2">
      <h2>Apparent Angular Size:</h2>
      <p dangerouslySetInnerHTML={{ __html: '---PLACEHOLDER---' }} />
    </div>
    <div className="f4">
      <h2>{visibilitySeason.title}</h2>
      {visibilitySeason.observatories}
    </div>
    <div className="f4">
      <h2>{midnightCulmination.label}</h2>
      <p>{midnightCulmination.text}</p>
      {midnightCulmination.description}
    </div>

    <style jsx>{style}</style>
  </section>
);

ObjectProfile.propTypes = {
  scienceName: PropTypes.string.isRequired,
  objectSpecs: PropTypes.shape({
    ra: PropTypes.string.isRequired,
    dec: PropTypes.string.isRequired,
    magnitude: PropTypes.string.isRequired,
  }).isRequired,
  visibilitySeason: PropTypes.shape({
    title: PropTypes.string.isRequired,
    observatories: PropTypes.arrayOf(PropTypes.node),
  }).isRequired,
  midnightCulmination: PropTypes.shape({
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ObjectProfile;
