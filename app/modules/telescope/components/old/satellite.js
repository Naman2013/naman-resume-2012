import React from 'react';
import { ModuleContainer } from './index';

const Satellite = ({ satelliteImageURL }) => (
  <ModuleContainer title="Satellite">
    <img alt="satellite" width="100%" src={satelliteImageURL} />
  </ModuleContainer>
);

export { Satellite };
