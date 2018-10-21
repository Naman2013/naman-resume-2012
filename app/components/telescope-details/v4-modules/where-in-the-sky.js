import React from 'react';
import PropTypes from 'prop-types';
import { ModuleContainer } from './module-container';
import StaticCell from 'components/object-details/grid/StaticCell';
import { hawkesBlue } from 'styles/variables/colors_tiles_v4';
import style from './where-in-the-sky.style';

const cellTheme = { borderBottom: `1px solid ${hawkesBlue}`, minHeight: 'auto' };

const WhereInTheSky = () => (
  <div>
    <ModuleContainer title="Where in the night&#39;s sky">
      <div style={{ border: '1px solid blue', width: '100%', height: '300px' }} />
      <StaticCell title="Distance from earth" theme={cellTheme}>
        <p>Deep space</p>
      </StaticCell>
      <StaticCell title="Apparent angular size" theme={cellTheme}>
        <p>0 31 50</p>
      </StaticCell>
      <StaticCell title="Actual size" theme={cellTheme}>
        <p>0 31 50</p>
      </StaticCell>
    </ModuleContainer>
    <style jsx>{style}</style>
  </div>
);

export { WhereInTheSky };
