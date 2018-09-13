import React from 'react';
import PropTypes from 'prop-types';
import BestTelescope from './BestTelescope';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';
import style from './ObjectProfile.style';

const ObjectProfile = ({
  scienceName,
  objectSpecs,
  visibilitySeason,
  bestTelescope,
  midnightCulmination,
}) => (
  <section className="object-details-grid">

    <Row>
      <StaticCell title="Scientific Name" flexScale={['100%']} hasBorderScale={[true]}>
        <p>{scienceName}</p>
      </StaticCell>
      <StaticCell>
        <div style={{ background: 'blue', width: '50px', height: '50px', display: 'inline-block', padding: '5px' }} />
      </StaticCell>
    </Row>

    <Row wrap>
      <StaticCell
        title="Celestial Coordinates"
        flexScale={['100%', '100%', '40%']}
        hasBorderScale={[false, false, true]}
        minHeight="100px"
      >
        <p>RA: {objectSpecs.ra}</p>
        <p>Dec: {objectSpecs.dec}</p>
      </StaticCell>

      <StaticCell
        title="Magnitude"
        flexScale={['100%', '40%', '10%']}
        hasBorderScale={[false, true]}
        minHeight="100px"
      >
        <p>{objectSpecs.magnitude}</p>
      </StaticCell>

      <StaticCell
        title="Apparent Angular Size"
        flexScale={['100%', '40%', '20%']}
        minHeight="100px"
      >
        <p dangerouslySetInnerHTML={{ __html: '---PLACEHOLDER---' }} />
      </StaticCell>
    </Row>










    <div className="row">
      <div className="column">
        <h2>{visibilitySeason.title}</h2>
        {visibilitySeason.observatories}
      </div>
    </div>

    <div className="row">
      <div className="column">
        <h2>{midnightCulmination.label}</h2>
        <p>{midnightCulmination.text}</p>
        {midnightCulmination.description}
      </div>
    </div>

    {
      bestTelescope.list.length > 0 &&
        <div className="row">
          <div className="column">
            <h2>{bestTelescope.label}</h2>
            <BestTelescope telescopes={bestTelescope.list} />
          </div>
        </div>
    }

    <style jsx>{style}</style>
  </section>
);

ObjectProfile.propTypes = {
  scienceName: PropTypes.string.isRequired,
  objectSpecs: PropTypes.shape({
    ra: PropTypes.number.isRequired,
    dec: PropTypes.number.isRequired,
    magnitude: PropTypes.number.isRequired,
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
  bestTelescope: PropTypes.shape({
    label: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default ObjectProfile;
