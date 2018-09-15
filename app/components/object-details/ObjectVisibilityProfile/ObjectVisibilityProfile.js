import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from '../grid/GridContainer';
import Row from '../grid/Row';
import StaticCell from '../grid/StaticCell';

const ObjectVisibilityProfile = () => (
  <GridContainer theme={{ margin: '20px 0 0 0' }}>
    <Row>
      <StaticCell title="Rise &#38; set times">
        <p>Add form...</p>
      </StaticCell>
    </Row>
    <Row>
      <StaticCell title="Rise">
        <p>6&#58;08 am</p>
      </StaticCell>
      <StaticCell title="Transit">
        <p>10&#58;44 am</p>
      </StaticCell>
      <StaticCell title="Set">
        <p>3&#58;18 pm</p>
      </StaticCell>
    </Row>
    <Row>
      <StaticCell title="Notes">
        <p>Slightly difficult to see...</p>
      </StaticCell>
    </Row>
  </GridContainer>
);

ObjectVisibilityProfile.propTypes = {};

export default ObjectVisibilityProfile;
