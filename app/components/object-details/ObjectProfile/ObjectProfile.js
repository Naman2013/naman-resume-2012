import React from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
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
        theme={{ minHeight: '100px' }}
      >
        <p>RA: {objectSpecs.ra}</p>
        <p>Dec: {objectSpecs.dec}</p>
      </StaticCell>

      <StaticCell
        title="Magnitude"
        flexScale={['100%', '40%', '10%']}
        hasBorderScale={[false, true]}
        theme={{ minHeight: '100px' }}
      >
        <p>{objectSpecs.magnitude}</p>
      </StaticCell>

      <StaticCell
        title="Apparent Angular Size"
        flexScale={['100%', '40%', '20%']}
        theme={{ minHeight: '100px' }}
      >
        <p dangerouslySetInnerHTML={{ __html: '---PLACEHOLDER---' }} />
      </StaticCell>
    </Row>

    <Row wrap>
      <StaticCell
        flexScale={['100%', '100%', '20%']}
        hasBorderScale={[true]}
        theme={{ minHeight: '240px' }}
        displayAtBreakpoints={{
          screenSmall: false,
          screenMedium: false,
          screenLarge: true,
          screenXLarge: true,
        }}
      >
        <Row wrap>
          <StaticCell
            title={visibilitySeason.title}
            theme={{ padding: 0, marginBottom: '20px' }}
          >
            {visibilitySeason.observatories}
          </StaticCell>
          <StaticCell
            flexScale={['100%']}
            title={midnightCulmination.label}
            theme={{ padding: 0, borderBottom: 'none' }}
          >
            <p>{midnightCulmination.text}</p>
            {midnightCulmination.description}
          </StaticCell>
        </Row>
      </StaticCell>

      {
        bestTelescope.list.length > 0 &&
        <StaticCell
          flexScale={['100%', '100%', '40%']}
          title={bestTelescope.label}
          theme={{ minHeight: '240px' }}
        >
          <BestTelescope telescopes={bestTelescope.list} />
        </StaticCell>
      }
    </Row>

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
