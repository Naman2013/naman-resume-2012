import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import GridContainer from '../grid/GridContainer';
import BestTelescope from './BestTelescope';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';
import style from './ObjectProfile.style';
import messages from './ObjectProfile.messages';

const ObjectProfile = ({
  scienceName,
  objectSpecs,
  visibilitySeason,
  bestTelescope,
  midnightCulmination,
  intl,
}) => (
  <GridContainer>
    <Row>
      <StaticCell title={intl.formatMessage(messages.ScientificName)} flexScale={['100%']}>
        <p>{scienceName}</p>
      </StaticCell>
    </Row>

    <Row wrap>
      <StaticCell
        title={intl.formatMessage(messages.CelestialCoordinates)}
        flexScale={['100%', '100%', '40%']}
        hasBorderScale={[false, false, true]}
        theme={{ minHeight: '165px' }}
      >
        <p>RA: {objectSpecs.ra}</p>
        <p>Dec: {objectSpecs.dec}</p>
      </StaticCell>

      <StaticCell
        title={intl.formatMessage(messages.Magnitude)}
        flexScale={['100%', '40%', '10%']}
        hasBorderScale={[false, true]}
        theme={{ minHeight: '165px' }}
      >
        <p>{objectSpecs.magnitude}</p>
      </StaticCell>

      <StaticCell
        title={intl.formatMessage(messages.ApparentAngularSize)}
        flexScale={['100%', '40%', '20%']}
        theme={{ minHeight: '165px' }}
      >
        <p dangerouslySetInnerHTML={{ __html: 'PLACEHOLDER' }} />
      </StaticCell>
    </Row>

    <Row wrap>
      <StaticCell
        flexScale={['100%', '100%', '20%']}
        hasBorderScale={[true]}
        theme={{ minHeight: '360px' }}
        displayAtBreakpoints={{
          screenSmall: false,
          screenMedium: false,
          screenLarge: true,
          screenXLarge: true,
        }}
      >
        <Row wrap>
          {visibilitySeason.show === true && (
            <StaticCell title={visibilitySeason.title} theme={{ padding: 0, marginBottom: '20px' }}>
              {visibilitySeason.observatories}
            </StaticCell>
          )}

          {midnightCulmination.show === true && (
            <StaticCell
              flexScale={['100%']}
              title={midnightCulmination.label}
              theme={{ padding: 0, borderBottom: 'none' }}
            >
              <p>{midnightCulmination.text}</p>
              {midnightCulmination.description}
            </StaticCell>
          )}
        </Row>
      </StaticCell>

      {bestTelescope.list.length > 0 && (
        <StaticCell
          flexScale={['100%', '100%', '40%']}
          title={bestTelescope.label}
          theme={{ minHeight: '360px', alignSelf: 'flex-start' }}
        >
          <BestTelescope telescopes={bestTelescope.list} />
        </StaticCell>
      )}
    </Row>

    <style jsx>{style}</style>
  </GridContainer>
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
      linkUrl: PropTypes.string.isRequired,
    })),
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ObjectProfile);
