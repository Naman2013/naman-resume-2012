import React from 'react';
import PropTypes from 'prop-types';
import { GridContainer, Row, StaticCell } from '../../common/grid';
import BestTelescope from './BestTelescope';
import style from './ObjectProfile.style';
import VisibilityChart from './VisibilityChart';

const ObjectProfile = ({
  scienceName,
  objectSpecs,
  visibilitySeason,
  bestTelescope,
  midnightCulmination,
  midnight12MonthChart,
  showMidnight12MonthChart,
}) => (
  <GridContainer>
    <Row>
      <StaticCell title={objectSpecs.nameLabel} flexScale={['100%']}>
        <p>{scienceName}</p>
      </StaticCell>
    </Row>

    <Row wrap>
      <StaticCell
        title={objectSpecs.coordinatesLabel}
        flexScale={['100%', '100%', '40%']}
        hasBorderScale={[false, false, true]}
        theme={{ minHeight: '165px' }}
      >
        <p dangerouslySetInnerHTML={{ __html: objectSpecs.сoordinates }} />
      </StaticCell>

      <StaticCell
        title={objectSpecs.magnitudeLabel}
        flexScale={['100%', '40%', '10%']}
        hasBorderScale={[false, true]}
        theme={{ minHeight: '165px' }}
      >
        <p>{objectSpecs.magnitude}</p>
      </StaticCell>

      <StaticCell
        title={objectSpecs.apparentAngularSizeLabel}
        flexScale={['100%', '40%', '20%']}
        theme={{ minHeight: '165px' }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: objectSpecs.apparentAngularSizeText,
          }}
        />
      </StaticCell>
    </Row>

    <Row wrap>
      {(visibilitySeason.show || midnightCulmination.show) && (
        <StaticCell
          flexScale={['100%', '100%', '20%']}
          hasBorderScale={[true]}
          displayAtBreakpoints={{
            screenSmall: false,
            screenMedium: false,
            screenLarge: true,
            screenXLarge: true,
          }}
        >
          <Row wrap>
            {visibilitySeason.show && (
              <StaticCell
                title={visibilitySeason.title}
                theme={{
                  padding: '0px',
                  paddingBottom: '20px',
                  marginBottom: '20px',
                }}
                hasBottomBorder={midnightCulmination.show}
              >
                {visibilitySeason.observatories}
              </StaticCell>
            )}

            {midnightCulmination.show && (
              <StaticCell
                flexScale={['100%']}
                title={midnightCulmination.label}
                theme={{ padding: 0, borderBottom: 'none', minHeight: 0 }}
              >
                <p>{midnightCulmination.text}</p>
                {midnightCulmination.description}
              </StaticCell>
            )}
          </Row>
        </StaticCell>
      )}

      {/* {bestTelescope.list.length > 0 && (
        <StaticCell
          flexScale={['100%', '100%', '40%']}
          title={bestTelescope.label}
          theme={{ alignSelf: 'flex-start' }}
          hasBottomBorder={false}
        >
          <BestTelescope
            visitLabel={bestTelescope.buttonCaption}
            telescopes={bestTelescope.list}
          />
        </StaticCell>
      )} */}

        <StaticCell
          flexScale={['100%', '100%', '40%']}
          title={""}
          theme={{ alignSelf: 'flex-start' }}
          hasBottomBorder={false}
        >
          {showMidnight12MonthChart && (
            <VisibilityChart            
              observatory={midnight12MonthChart.observatories}
            />
          )}          
        </StaticCell>
    </Row>

    <style jsx>{style}</style>
  </GridContainer>
);

ObjectProfile.propTypes = {
  scienceName: PropTypes.string.isRequired,
  objectSpecs: PropTypes.shape({
    nameLabel: PropTypes.string.isRequired,
    magnitude: PropTypes.number.isRequired,
    coordinatesLabel: PropTypes.string.isRequired,
    сoordinates: PropTypes.string.isRequired,
    apparentAngularSizeLabel: PropTypes.string.isRequired,
    apparentAngularSizeText: PropTypes.string.isRequired,
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
    list: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        linkUrl: PropTypes.string.isRequired,
      })
    ),
    buttonCaption: PropTypes.string.isRequired,
  }).isRequired,
};

export default ObjectProfile;
