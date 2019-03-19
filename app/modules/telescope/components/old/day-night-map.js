import React from 'react';
import { ModuleContainer } from './index';

const DayNightMap = ({ dayNightMapURL }) => (
  <ModuleContainer title="Day/night map">
    <img alt="Day night map" width="100%" height="300" src={dayNightMapURL} />
  </ModuleContainer>
);

export { DayNightMap };
