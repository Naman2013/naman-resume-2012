import React from 'react';
import { ModuleContainer } from './';
import StaticCell from 'components/object-details/grid/StaticCell';
import { hawkesBlue } from 'styles/variables/colors_tiles_v4';
import style from './sky-conditions.style';

const cellTheme = { borderBottom: `1px solid ${hawkesBlue}`, minHeight: 'auto' };

const SkyConditions = () => (
  <ModuleContainer title="Sky conditions">
    <StaticCell theme={cellTheme} title="Seeing conditions">
      <h3 className="level">Level 3</h3>
      <p className="content-description">Almost continuous distortion with occasional brief good moments.</p>
    </StaticCell>

    <StaticCell theme={cellTheme} title="Measured FWHM telemetry">
      <p className="content-description">N.N Arcseconds</p>
    </StaticCell>

    <style jsx>{style}</style>
  </ModuleContainer>
);

export { SkyConditions };
